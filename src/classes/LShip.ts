import {Area, Rotation, Ship, Size} from "./Ship";

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

  public getArea(): Area {
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