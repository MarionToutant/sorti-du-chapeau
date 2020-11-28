import React from 'react';

import Home from './Home.js';

import nameList from './reducers/handlePlayer';
import { Provider } from 'react-redux';
import { createStore, combineReducers }  from 'redux';

const store = createStore(combineReducers({nameList}));

function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
