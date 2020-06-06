import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import './index.css';
//import reducer 
import { Provider, applyMiddleware, compose } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

let user = () => { return null};
const reducer = combineReducers({
  user: user
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
   
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
