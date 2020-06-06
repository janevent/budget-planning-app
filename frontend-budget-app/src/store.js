import userReducer from './reducers/user.js';
import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({
    user: userReducer
  })
  
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  export default store
  