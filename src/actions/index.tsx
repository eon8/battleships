export const START_GAME = 'START_GAME';
export const MAKE_A_MOVE = 'MAKE_A_MOVE';
export const CHECK_IS_END = 'CHECK_IS_END';

export interface StartGame {
  type: typeof START_GAME;
  payload: {
    ships: any,
    options: any
  };
}

export interface MakeAMove {
  type: typeof MAKE_A_MOVE;
  payload: {
    x: number,
    y: number
  };
}

export interface CheckIsEnd {
  type: typeof CHECK_IS_END;
}

export type FieldAction = StartGame | MakeAMove | CheckIsEnd;

export function startGame(ships: any, options = {}): StartGame {
  return {
    type: START_GAME,
    payload: {
      ships,
      options
    }
  }
}

export function makeAMove(x, y): MakeAMove {
  return {
    type: MAKE_A_MOVE,
    payload: {
      x,
      y
    }
  }
}


export function checkIsEnd(): CheckIsEnd {
  return {
    type: CHECK_IS_END
  }
}
