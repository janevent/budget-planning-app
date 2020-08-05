import React from 'react';
//import logo from './logo.svg';
import './App.css';
import NewUser from './NewUser.js';
import User from './User.js';
import NavigationBar from './Navigation.js';
import NewTemplateFormContainer from './components/NewTemplateFormContainer.js';
import NewBudgetFormContainer from './components/NewBudgetFormContainer.js';
import ShowTemplateContainer from './components/ShowTemplateContainer.js';
import ShowBudgetContainer from './components/ShowBudgetContainer.js';
import EditTemplateContainer from './components/EditTemplateContainer.js';
import Home from './components/Home.js';
import Budgets from './components/Budgets.js';

import fetchCurrentUser from './actions/getCurrentUser.js';
import getTemplates from './actions/getTemplates.js';
import getBudgets from './actions/getBudgets.js';
import setTemplate from './actions/showTemplate/setTemplate.js';
import setBudget from './actions/showBudget/setBudget.js';

import LogOut from './LogOut.js';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  

  componentDidMount(){
    console.log("App did mount")
    //dispatch action w action.type GET_CURRENT_USER
    this.props.fetchCurrentUser();
  }

  render(){     
      return (
        this.props.user ?
          <div className="App">
            <NavigationBar /> 
            <Switch>
              
              <Route path='/new_template' component={NewTemplateFormContainer } />  
              <Route path='/new_budget' component={NewBudgetFormContainer} />
              <Route path='/budgets' component={Budgets} />
              <Route path='/templates/:id' render={ (props) => <ShowTemplateContainer  {...props} /> } />
              <Route path='/budgets/:id' render={(props) => <ShowBudgetContainer  {...props} />} /> 
              <Route path='/templates/edit/:id' render={ (props) => <EditTemplateContainer {...props} />} />
              <Route path='/' component={Home} />
            </Switch>  
            <p id="delete-warning" className="hidden" >Clicking on button will permanently delete data</p>                    
          </div> :        
          <div className="App">
            <NewUser/>
            <User/>
          </div>
        
      )
  }
};

const mapStateToProps = ({ user, templates, budgets }) => {
  return {
    user,
    budgets,
    templates
  }
}
export default connect(mapStateToProps, { fetchCurrentUser, getTemplates, getBudgets, setTemplate, setBudget } )(App);

//setTemplate setBudget
