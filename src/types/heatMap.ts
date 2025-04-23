interface HeatmapRenderer {
  canvas: HTMLCanvasElement;
  shadowCanvas: HTMLCanvasElement;
}

export interface HeatmapInstance {
  _renderer: HeatmapRenderer;
  setData: (data: { max: number; min: number; data: any[] }) => void;
}
