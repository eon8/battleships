import {Rotation, Ship, Size} from "./Ship";

export class LShip extends Ship {
  // TODO simplify because it is duplication from parent
  constructor(protected rotation: Rotation) {
    super(rotation);
  }

  public getSize(): Size {
    switch (this.rotation) {
      case 0:
      case 180:
        return {
          width: 2,
          height: 4
        };
      case 90:
      case 270:
        return {
          width: 4,
          height: 2
        };
    }
  }
}