import {Area, Rotation, Ship} from "./Ship";

export class LShip extends Ship {
  // TODO simplify because it is duplication from parent
  constructor(protected rotation: Rotation) {
    super(rotation);
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