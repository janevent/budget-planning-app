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
import Home from './components/Home.js';

import getCurrentUser from './actions/getCurrentUser.js';
import getTemplates from './actions/getTemplates.js';
import getBudgets from './actions/getBudgets.js';
import LogOut from './LogOut.js';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class App extends React.Component {

  getUser = () => {
    fetch('http://localhost:3001/get_current_user', {
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        }
    })
    .then( r => r.json())
    .then(myjson => {
      if(myjson.error){
        alert(myjson.error)
      }else {
      console.log("user:", myjson)
      //console.log("props:", this.props)
      //debugger
      this.props.getCurrentUser(myjson.data.attributes);
      //do I need to make an object w key of user etc?
      console.log(myjson)
      let budgies = myjson.included.filter( b => b.type==="budget");
      let tempies = myjson.included.filter( t => t.type==="template");
      console.log("b:", budgies);
      console.log("t:", tempies)
      this.props.getTemplates(tempies);
      this.props.getBudgets(budgies);
      }
      //get budgets
      //get templates
    } )
    .catch(console.log)
  }

  componentDidMount(){
    console.log("App did mount")
    //dispatch action w action.type GET_CURRENT_USER
    this.getUser();
  }

  render(){     
      return (
        this.props.user ?
          <div className="App">
            <NavigationBar /> 
            <Switch>
              
              <Route path='/new_template' component={NewTemplateFormContainer } />  
              <Route path='/new_budget' component={NewBudgetFormContainer} />
              <Route path='/template' component={ShowTemplateContainer} />
              <Route path='/budget' component={ShowBudgetContainer} />
              <Route path='/' component={Home} />
            </Switch>                      
          </div> :        
          <div className="App">
            <NewUser/>
            <User/>
          </div>
        
      )
  }
};

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}
export default connect(mapStateToProps, { getCurrentUser, getTemplates, getBudgets } )(App);
