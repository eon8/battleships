import {BaseShip} from "./BaseShip";

export class IShip extends BaseShip {

  public getShape(): number[][] {
    const i = this.id;

    switch (this.rotation) {
      case 0:
      case 180:
        return [
          [i],
          [i],
          [i],
          [i]
        ];
      case 90:
      case 270:
        return [
          [i, i, i, i]
        ];
    }
  }
}