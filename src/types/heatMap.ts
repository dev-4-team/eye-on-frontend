interface HeatmapRenderer {
  canvas: HTMLCanvasElement;
  shadowCanvas: HTMLCanvasElement;
}

export interface HeatmapInstance {
  renderer: HeatmapRenderer;
  setData: (data: {
    max: number;
    min: number;
    data: Array<{ x: number; y: number; value: number }>;
  }) => void;
}
