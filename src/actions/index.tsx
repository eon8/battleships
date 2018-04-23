import {AnyShip} from '../reducers';

export const START_GAME = 'START_GAME';
export const MAKE_A_MOVE = 'MAKE_A_MOVE';

export interface StartGame {
  type: typeof START_GAME;
  payload: {
    ships: AnyShip[],
    options: {}
  };
}

export interface MakeAMove {
  type: typeof MAKE_A_MOVE;
  payload: {
    x: number,
    y: number
  };
}

export type GameAction = StartGame | MakeAMove;

export function startGame(ships: AnyShip[], options = {}): StartGame {
  return {
    type: START_GAME,
    payload: {
      ships,
      options
    }
  }
}

export function makeAMove(x: number, y: number): MakeAMove {
  return {
    type: MAKE_A_MOVE,
    payload: {
      x,
      y
    }
  }
}
