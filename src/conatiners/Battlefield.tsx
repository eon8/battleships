import {connect} from 'react-redux';
import Battlefield, {Props} from '../components/Battlefield';
import {StoreState} from '../reducers';

export default connect(({playerField}: StoreState): Props => {
  return {playerField};
})(Battlefield);