import { SEOUL_CENTER_LONGITUDE } from '@/constants/map'
import { useThrottledHeatmapUpdate } from '@/hooks/useThrottledHeatmapUpdate'
import { calculateRealDistanceOnePixel } from '@/lib/map'
import type { HeatmapInstance } from '@/types/heatMap'
import type { Protest } from '@/types/protest'
import { useEffect, useState } from 'react'

interface Props {
  mapInstance: kakao.maps.Map | null
  protests: Protest[]
}

export const useHeatMap = ({ mapInstance, protests }: Props) => {
  const [heatmapInstance, setHeatmapInstance] = useState<HeatmapInstance | null>(null)
  const [realXDistance, setRealXDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!mapInstance || !protests) return
    const updateBounds = () => {
      const bounds = mapInstance.getBounds()
      const southWestLat = bounds.getSouthWest().getLat()
      const northEastLat = bounds.getNorthEast().getLat()
      const currentPixel =
        calculateRealDistanceOnePixel(
          southWestLat,
          SEOUL_CENTER_LONGITUDE,
          northEastLat,
          SEOUL_CENTER_LONGITUDE,
        ) / window.innerWidth
      setRealXDistance(prev => {
        if (prev === currentPixel) return prev
        return currentPixel
      })
    }
    updateBounds()
    window.kakao.maps.event.addListener(mapInstance, 'bounds_changed', updateBounds)
    return () => {
      window.kakao.maps.event.removeListener(mapInstance, 'bounds_changed', updateBounds)
    }
  }, [mapInstance, protests])

  useThrottledHeatmapUpdate({ mapInstance, heatmapInstance, protests, realXDistance })

  useEffect(() => {
    if (!mapInstance || heatmapInstance) return

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/heatmap.js@2.0.5/build/heatmap.min.js'
    script.integrity = process.env.NEXT_PUBLIC_HEATMAP_SRI || ''
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      const container = document.getElementById('map')
      if (!container) return

      const heatmap = (window as any).h337.create({
        container,
        maxOpacity: 0.4,
        minOpacity: 0.1,
        blur: 0.95,
      })

      setHeatmapInstance(heatmap)

      const canvas = heatmap._renderer.canvas
      if (canvas) {
        canvas.style.zIndex = '10'
        canvas.style.pointerEvents = 'none'
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
      try {
        if (script.parentNode) {
          document.head.removeChild(script)
        }
      } catch (error) {
        console.error(`heatmap 스크립트 제거 실패 ${error}`)
      }
    }
  }, [mapInstance, heatmapInstance])
}
