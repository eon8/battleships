import {Rotation, Ship, Size} from "./Ship";

export class DotShip extends Ship {
  // TODO simplify because it is duplication from parent
  constructor(protected rotation: Rotation) {
    super(rotation);
  }

  public getSize(): Size {
    switch (this.rotation) {
      case 0:
      case 90:
      case 180:
      case 270:
        return {
          width: 1,
          height: 1
        };
    }
  }
}