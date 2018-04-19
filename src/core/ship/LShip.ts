import {BaseShip} from "./BaseShip";

export class LShip extends BaseShip {

  // TODO implement matrix rotation
  public getShape(): number[][] {
    const i = this.id;

    switch (this.rotation) {
      case 0:
        return [
          [i, 0],
          [i, 0],
          [i, 0],
          [i, i]
        ];
      case 90:
        return [
          [0, 0, 0, i],
          [i, i, i, i]
        ];
      case 180:
        return [
          [i, i],
          [0, i],
          [0, i],
          [0, i]
        ];
      case 270:
        return [
          [i, i, i, i],
          [i, 0, 0, 0]
        ];
    }
  }
}