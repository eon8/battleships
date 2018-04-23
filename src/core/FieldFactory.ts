import {AnyShip} from '../reducers';
import {Field} from './Field';
import {getRandomInt} from './Helper';
import {BaseShip, Rotation} from './ship/BaseShip';

export default function FieldFactory<T extends BaseShip>(constructorFns: AnyShip[], {width = 10, height = 10} = {}): Field {

  const ships: BaseShip[] = [];

  for (const shipConstructor of constructorFns) {

    let field: Field | null;
    let ship: BaseShip;

    do {

      ship = new shipConstructor(
        [0, 90, 180, 270][getRandomInt(0, 3)] as Rotation
      );

      ship.setPosition(
        getRandomInt(0, width - ship.getArea().getWidth()),
        getRandomInt(0, height - ship.getArea().getHeight())
      );

      try {

        field = new Field({width, height}, [...ships, ship]);

      } catch (e) {

        field = null;

      }

    } while (!field);

    ships.push(ship);

  }

  return new Field({width, height}, ships);

};
