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

  public markHit(x: number, y: number): void {
    this.markCell(x - 1, y - 1);
    this.markCell(x - 1, y);
    this.markCell(x - 1, y + 1);
    this.markCell(x, y - 1);
    this.markCell(x, y, true);
    this.markCell(x, y + 1);
    this.markCell(x + 1, y - 1);
    this.markCell(x + 1, y);
    this.markCell(x + 1, y + 1);
  }

  private markCell(x: number, y: number, isShip: boolean = false): void {
    if (x >= 0 && x < this.getWidth() && y >= 0 && y < this.getHeight()) {
      this.set(x, y, isShip ? PlayerCellTypes.Ship : (this.get(x, y) !== PlayerCellTypes.Ship ? PlayerCellTypes.Margin : PlayerCellTypes.Ship));
    }
  }
}
