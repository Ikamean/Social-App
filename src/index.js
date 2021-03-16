import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Theme from './theme';

import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Provider store={ store }>
      <Theme>
          <App />
      </Theme>
    </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


