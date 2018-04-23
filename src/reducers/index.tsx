import {GameAction, MAKE_A_MOVE} from '../actions';

import {START_GAME} from '../actions';
import FieldFactory from "../core/FieldFactory";
import {generateMatrix} from "../core/Helper";

import {Area} from "../core/Area";
import {Field} from "../core/Field";
import {PlayerArea, PlayerCellTypes} from "../core/PlayerArea";

export interface StoreState {
  field: number[][];
  ships: any[];
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
      return {
        ...state,
        field: gameField.getArea(),
        playerField: generateMatrix(gameField.getArea()[0].length, gameField.getArea().length),
        numberOfMoves: 0,
        isGameEnded: false,
        ships: gameField.getShips()
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

function shootAt(area: number[][], field: number[][], ships: any[], x: number, y: number): number [][] {
  const playerArea = new PlayerArea(area);

  if (field[y][x]) {
    const ship = ships.find((s: any) => s.id === field[y][x]);

    new Area(ship.area).traverse((value: number, sx: number, sy: number) => {
      if (value !== Area.EMPTY) {
        playerArea.markHit(ship.y + sy, ship.x + sx);
      }
    });

    playerArea.set(x, y, PlayerCellTypes.Hit);

  } else {
    playerArea.set(x, y, PlayerCellTypes.Miss);
  }

  return playerArea.export();

}
