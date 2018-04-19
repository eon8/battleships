import { EnthusiasmAction } from '../actions';
import { StoreState } from '../actions/types';

import { DECREMENT_ENTHUSIASM,INCREMENT_ENTHUSIASM } from '../actions/constants';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, numberOfMoves: state.numberOfMoves + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, numberOfMoves: Math.max(1, state.numberOfMoves - 1) };
  }
  return state;
}