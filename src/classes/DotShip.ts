import {Area, Rotation, Ship} from "./Ship";

export class DotShip extends Ship {
  // TODO simplify because it is duplication from parent
  constructor(protected rotation: Rotation) {
    super(rotation);
  }

  public getArea(): Area {
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