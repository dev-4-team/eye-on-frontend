import { throttle } from '@/lib/utils';
import { shouldRenderHeatmap } from '@/lib/heatmap';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Protest } from '@/types/protest';

interface Props {
  mapInstance: kakao.maps.Map | null;
  heatmapInstance: any;
  protests: Protest[];
  realXDistance: number | null | undefined;
}

export const useThrottledHeatmapUpdate = ({
  mapInstance,
  heatmapInstance,
  protests,
  realXDistance,
}: Props) => {
  const animationFrameRef = useRef<number | null>(null); // rAF 예약 ID
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 10;

  const updateHeatmap = useCallback(() => {
    if (!mapInstance || !heatmapInstance || !realXDistance) return;

    const canvas = heatmapInstance._renderer?.canvas;
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      if (retryCountRef.current >= MAX_RETRIES) {
        console.warn('🔥 Heatmap canvas not ready after max retries');
        return;
      }

      retryCountRef.current += 1;
      requestAnimationFrame(() => updateHeatmap());
      return;
    }

    retryCountRef.current = 0; // 성공 시 초기화

    const projection = mapInstance.getProjection();
    const bounds = mapInstance.getBounds();

    const heatmapData = protests
      .map(protest => {
        const latLng = new window.kakao.maps.LatLng(
          protest.locations[0].latitude,
          protest.locations[0].longitude,
        );

        const pixel = projection.pointFromCoords(latLng);

        return {
          x: pixel.x - projection.pointFromCoords(bounds.getSouthWest()).x,
          y: pixel.y - projection.pointFromCoords(bounds.getNorthEast()).y,
          value: protest.declaredParticipants,
          radius: protest.radius / realXDistance,
        };
      })
      .filter(Boolean);

    if (!shouldRenderHeatmap({ mapInstance, heatmapInstance })) {
      console.warn('heatmap hide!');
      return;
    }

    heatmapInstance.setData({
      max: 10000,
      min: 100,
      data: heatmapData,
    });
  }, [mapInstance, heatmapInstance, protests, realXDistance]);

  const throttledUpdate = useMemo(() => {
    return throttle(() => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        updateHeatmap();
        animationFrameRef.current = null;
      });
    }, 100);
  }, [updateHeatmap]);

  useEffect(() => {
    if (mapInstance && heatmapInstance) {
      requestAnimationFrame(() => {
        updateHeatmap(); // 첫 업데이트는 안전하게 defer
      });
    }
  }, [mapInstance, heatmapInstance, updateHeatmap]);

  useEffect(() => {
    if (!mapInstance || !heatmapInstance) return;

    kakao.maps.event.addListener(mapInstance, 'center_changed', throttledUpdate);
    kakao.maps.event.addListener(mapInstance, 'zoom_start', () => {
      heatmapInstance._renderer.canvas.style.opacity = '0';
    });
    kakao.maps.event.addListener(mapInstance, 'zoom_changed', () => {
      heatmapInstance._renderer.canvas.style.opacity = '1';
    });
    kakao.maps.event.addListener(mapInstance, 'drag', throttledUpdate);

    return () => {
      kakao.maps.event.removeListener(mapInstance, 'center_changed', throttledUpdate);
      kakao.maps.event.removeListener(mapInstance, 'zoom_start', throttledUpdate);
      kakao.maps.event.removeListener(mapInstance, 'zoom_changed', throttledUpdate);
      kakao.maps.event.removeListener(mapInstance, 'drag', throttledUpdate);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mapInstance, heatmapInstance, throttledUpdate]);
};
