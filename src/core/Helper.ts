export function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function generateMatrix(width: number, height: number, fill: number = 0): number[][] {
  return new Array(height).fill(fill).map(() => {
    return new Array(width).fill(fill);
  });
}