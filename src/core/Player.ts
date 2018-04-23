import {Area} from './Area';
import {getRandomInt} from './Helper';

export enum PlayerCellTypes {
  Unknown,
  Miss,
  Margin,
  Ship,
  Hit,
}

export class Player extends Area {
  public randomEmptyCell(): { x: number, y: number } {
    let x;
    let y;
    do {
      x = getRandomInt(0, this.getWidth() - 1);
      y = getRandomInt(0, this.getHeight() - 1);
    } while (this.get(x, y) !== PlayerCellTypes.Unknown);
    return {x, y};
  }

  public markHit(i: number, j: number): void {
    this.markCell(i - 1, j - 1);
    this.markCell(i - 1, j);
    this.markCell(i - 1, j + 1);
    this.markCell(i, j - 1);
    this.markCell(i, j, true);
    this.markCell(i, j + 1);
    this.markCell(i + 1, j - 1);
    this.markCell(i + 1, j);
    this.markCell(i + 1, j + 1);
  }

  private markCell(i: number, j: number, isShip: boolean = false): void {
    if (i >= 0 && i < this.getHeight() && j >= 0 && j < this.getWidth()) {
      this.set(j, i, isShip ? PlayerCellTypes.Ship : (this.get(j, i) !== PlayerCellTypes.Ship ? PlayerCellTypes.Margin : PlayerCellTypes.Ship));
    }
  }
}
