import userReducer from './reducers/user.js';
import budgetReducer from './reducers/budget.js';
import budgetsReducer from './reducers/budgets.js';
import templateReducer from './reducers/template.js';
import templatesReducer from './reducers/templates.js'

import { createStore, combineReducers } from 'redux';

const reducer = combineReducers({
    user: userReducer,
    budget: budgetReducer,
    budgets: budgetsReducer,
    template: templateReducer,
    templates: templatesReducer
  })
  
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  export default store
  