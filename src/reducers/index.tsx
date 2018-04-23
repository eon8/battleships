import {GameAction, MAKE_A_MOVE, START_GAME} from '../actions';

import FieldFactory from '../core/FieldFactory';
import {generateMatrix} from '../core/Helper';

import {Area} from '../core/Area';
import {Field} from '../core/Field';
import {Player, PlayerCellTypes} from '../core/Player';
import {DotShip} from '../core/ship/DotShip';
import {IShip} from '../core/ship/IShip';
import {LShip} from '../core/ship/LShip';

export type AnyShip = typeof LShip | typeof IShip | typeof DotShip;

export interface ShipInfo {
  id: number;
  x: number;
  y: number;
  shape: number[][];
}

export interface StoreState {
  field: number[][];
  ships: ShipInfo[];
  playerField: number[][];
  numberOfMoves: number;
  isGameEnded: boolean;
}

const initialState: StoreState = {
  field: [[]],
  ships: [],
  playerField: [[]],
  numberOfMoves: 0,
  isGameEnded: false
};

export function reducer(state: StoreState = initialState, action: GameAction): StoreState {
  switch (action.type) {

    case START_GAME:

      const gameField: Field = FieldFactory(action.payload.ships, action.payload.options);
      const field = gameField.getMatrix();
      const ships = gameField.getShips();

      return {
        ...state,
        field,
        ships,
        playerField: generateMatrix(field[0].length, field.length),
        numberOfMoves: 0,
        isGameEnded: false
      };

    case MAKE_A_MOVE:

      const playerField = shootAt(state.playerField, state.field, state.ships, action.payload.x, action.payload.y);

      return {
        ...state,
        playerField,
        isGameEnded: playerField.reduce(
          (totalHits, row) => totalHits + row.reduce(
            (rowHits, cell) => rowHits + (cell === PlayerCellTypes.Hit ? 1 : 0),
            0),
          0) === state.ships.length,
        numberOfMoves: state.numberOfMoves + 1
      };

  }
  return state;
}

function shootAt(playerArea: number[][], area: number[][], ships: ShipInfo[], x: number, y: number): number [][] {
  const playerField: Player = new Player(playerArea);
  const field: Area = new Area(area);

  if (field.get(x, y)) {
    const ship = ships.find((shipInfo: ShipInfo) => shipInfo.id === field.get(x, y));

    if (!ship) {
      throw new Error('No ship with id ' + field.get(x, y) + ' was found');
    }

    new Area(ship.shape).traverse((value: number, sx: number, sy: number) => {
      if (value !== Area.EMPTY) {
        playerField.markHit(ship.x + sx, ship.y + sy);
      }
    });

    playerField.set(x, y, PlayerCellTypes.Hit);

  } else {

    playerField.set(x, y, PlayerCellTypes.Miss);

  }

  return playerField.toMatrix();

}
