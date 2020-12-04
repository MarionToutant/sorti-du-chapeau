import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './Home.js';

import nameList from './reducers/handlePlayer';
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

const store = createStore(combineReducers({nameList}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Home} path="/" exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
