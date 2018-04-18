import {Area, Rotation, Ship, Size} from "./Ship";

export class IShip extends Ship {
  // TODO simplify because it is duplication from parent
  constructor(protected rotation: Rotation) {
    super(rotation);
  }

  // TODO remove and use getArea dimensions?
  public getSize(): Size {
    switch (this.rotation) {
      case 0:
      case 180:
        return {
          width: 1,
          height: 4
        };
      case 90:
      case 270:
        return {
          width: 4,
          height: 1
        };
    }
  }

  public getArea(): Area {
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