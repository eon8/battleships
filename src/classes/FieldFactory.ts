import {DotShip} from "./DotShip";
import {Field} from "./Field";
import {IShip} from "./IShip";
import {LShip} from "./LShip";
import {Rotation, Ship, Size} from "./Ship";

import {getRandomInt} from "./Helper";

export default function <T extends Ship>(fieldSize: Size, constructorFns: Array<typeof LShip | typeof IShip | typeof DotShip>): Field {
// export default function <T extends Ship>(fieldSize: Size, constructorFns: Array<{ new(...args: any[]): T }>): Field {
// export default function <T extends Ship>(fieldSize: Size, constructorFns: Array<new () => T>): Field {
// export default function (fieldSize: Size, constructorFns: Array<new () => Ship>): Field {

  const ships: Ship[] = [];

  for (const constructorFn of constructorFns) {

    const rotation:Rotation = [0, 90, 180, 270][getRandomInt(0, 3)] as Rotation;

    const ship = new constructorFn(rotation);

    let field: Field;

    do {
      ship.setPosition({
        x: getRandomInt(0, fieldSize.width - ship.getSize().width),
        y: getRandomInt(0, fieldSize.height - ship.getSize().height)
      });

      // TODO inject ship positioning inside Field class?
      field = new Field(fieldSize, [...ships, ship]);

    } while (!field.validate()) ;

    ships.push(ship);

  }

  return new Field(fieldSize, ships);

};
