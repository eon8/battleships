import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import registerServiceWorker from './registerServiceWorker';

import App from './conatiners/App';

import {Area} from "./core/Area";

import {Provider} from 'react-redux';

import {createStore} from 'redux';

import {enthusiasm} from './reducers';

import {StoreState} from './actions/types';

const store = createStore<StoreState>(enthusiasm, {
  playerField: new Area([[]]),
  numberOfMoves: 0,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
