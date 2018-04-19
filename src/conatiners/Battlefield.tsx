import * as actions from '../actions/';

import { connect } from 'react-redux';
import { StoreState } from '../actions/types';
import Battlefield from '../components/Battlefield';

export function mapStateToProps({ playerField, numberOfMoves }: StoreState) {
  return {
    playerField,
    numberOfMoves,
  }
}

// export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
//   return {
//     onIncrement: () => dispatch(actions.incrementEnthusiasm()),
//     onDecrement: () => dispatch(actions.decrementEnthusiasm()),
//   }
// }

export default connect(mapStateToProps, {
  onIncrement: () => actions.incrementEnthusiasm(),
  onDecrement: () => actions.decrementEnthusiasm(),
})(Battlefield);