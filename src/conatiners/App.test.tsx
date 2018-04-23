import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer, StoreState} from '../reducers';
import App from './App';

it('renders without crashing', () => {
  const store = createStore<StoreState>(reducer);
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
