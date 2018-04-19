import {Field} from "./Field";
import {BaseShip, Rotation, Size} from "./ship/BaseShip";
import {DotShip} from "./ship/DotShip";
import {IShip} from "./ship/IShip";
import {LShip} from "./ship/LShip";

import {getRandomInt} from "./Helper";

export default function FieldFactory<T extends BaseShip>(fieldSize: Size, constructorFns: Array<typeof LShip | typeof IShip | typeof DotShip>): Field {
// export default function <T extends BaseShip>(fieldSize: Size, constructorFns: Array<{ new(...args: any[]): T }>): Field {
// export default function <T extends BaseShip>(fieldSize: Size, constructorFns: Array<new () => T>): Field {
// export default function (fieldSize: Size, constructorFns: Array<new () => BaseShip>): Field {

  const ships: BaseShip[] = [];

  for (const shipConstructor of constructorFns) {

    let field: Field | null;
    let ship: BaseShip;

    do {

      ship = new shipConstructor(
        [0, 90, 180, 270][getRandomInt(0, 3)] as Rotation
      );

      ship.setPosition(
        getRandomInt(0, fieldSize.width - ship.getArea().getWidth()),
        getRandomInt(0, fieldSize.height - ship.getArea().getHeight())
      );

      try {

        field = new Field(fieldSize, [...ships, ship]);

      } catch (e) {

        field = null;

      }

    } while (!field);

    ships.push(ship);

  }

  return new Field(fieldSize, ships);

};
