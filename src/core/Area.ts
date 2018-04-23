export class Area {

  constructor(private area: number[][]) {
  }

  public get(x: number, y: number): number {
    return this.area[y][x];
  }

  public set(x: number, y: number, value: number): void {
    this.area[y][x] = value;
  }

  public getWidth(): number {
    return this.area[0].length;
  }

  public getHeight(): number {
    return this.area.length;
  }

  public traverse(cb: (value: number, x: number, y: number) => void): void {
    for (let i = 0; i < this.getHeight(); i++) {
      for (let j = 0; j < this.getWidth(); j++) {
        cb(this.area[i][j], j, i);
      }
    }
  }

  public hasCollision(): boolean {

    for (let i = 0; i < this.area.length; i++) {
      for (let j = 0; j < this.area[i].length; j++) {

        if (this.area[i][j] === 0) {
          continue;
        }

        const maxi = this.area.length - 1;
        const maxj = this.area[0].length - 1;

        if (j < maxj && this.area[i][j + 1] !== 0 && this.area[i][j] !== this.area[i][j + 1]) {
          return true;
        }

        if (i < maxi && this.area[i + 1][j] !== 0 && this.area[i][j] !== this.area[i + 1][j]) {
          return true;
        }

        if (j < maxj && i < maxi && this.area[i + 1][j + 1] !== 0 && this.area[i][j] !== this.area[i + 1][j + 1]) {
          return true;
        }

      }
    }

    return false;
  }

}