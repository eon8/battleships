import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import {Provider} from "react-redux";
import {createStore} from "redux";
import App from "./conatiners/App";
import {field} from "./reducers";

import registerServiceWorker from './registerServiceWorker';

const store = createStore(field);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
