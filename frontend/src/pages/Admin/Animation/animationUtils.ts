export function calculateWidthAndHeight(coordinates: any[]): {
  width: number;
  height: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  let minX = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let minY = Number.MAX_VALUE;
  let maxY = Number.MIN_VALUE;

  for (const coord of coordinates) {
    minX = Math.min(minX, coord.x);
    maxX = Math.max(maxX, coord.x);
    minY = Math.min(minY, coord.y);
    maxY = Math.max(maxY, coord.y);
  }

  const width = maxX - minX;
  const height = maxY - minY;

  return { width, height, minX, minY, maxX, maxY };
}
