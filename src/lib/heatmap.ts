type HeatmapRenderCheckOptions = {
  mapInstance: kakao.maps.Map | null;
  heatmapInstance: any;
  minZoomLevel?: number;
};

export const shouldRenderHeatmap = ({
  mapInstance,
  heatmapInstance,
  minZoomLevel = 10,
}: HeatmapRenderCheckOptions): boolean => {
  if (!mapInstance || !heatmapInstance) return false;

  const level = mapInstance.getLevel();
  if (level > minZoomLevel) return false;

  const canvas = heatmapInstance?._renderer?.canvas;
  const shadowCanvas = heatmapInstance?._renderer?.shadowCanvas;

  const isValid = (c?: HTMLCanvasElement | null) => !!c && c.width > 0 && c.height > 0;

  return isValid(canvas) && isValid(shadowCanvas);
};
