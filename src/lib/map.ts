export const calculateRealDistanceOnePixel = (x1: number, y1: number, x2: number, y2: number) => {
  const R = 6371000;
  const toRadian = Math.PI / 180;
  const lat1 = x1 * toRadian;
  const lon1 = y1 * toRadian;
  const lat2 = x2 * toRadian;
  const lon2 = y2 * toRadian;

  return (
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2,
      ),
    )
  );
};
