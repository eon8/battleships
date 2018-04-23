import {BaseShip} from './BaseShip';

export class DotShip extends BaseShip {

  public getShape(): number[][] {
    const i = this.id;

    switch (this.rotation) {
      case 0:
      case 90:
      case 180:
      case 270:
        return [
          [i]
        ];
    }
  }
}