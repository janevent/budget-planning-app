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
        console.log("myjson:", myjson)
        //console.log("props:", this.props)
        //debugger
        this.props.getCurrentUser(myjson.user.data.attributes);
        
        let budgies = myjson.budgets.map( (b) => {
          let newb = b.data.attributes;
          newb.id = b.data.id;
          newb.expenses = b.included.filter( e => e.type ==="expense");
          newb.incomes = b.included.filter( i => i.type ==="income");
          return newb
        })
        let tempies = myjson.templates.map( (t) => {
          let newt = t.data.attributes;
          newt.id = t.data.id;
          newt.expenses = t.included.filter( e => e.type === "expense");
          newt.incomes = t.included.filter( i => i.type ==="income");
          return newt
        })
        //debugger

        //do I need to make an object w key of user etc?
        //console.log(myjson)
        //let budgies = myjson.included.filter( b => b.type==="budget");
        //let tempies = myjson.included.filter( t => t.type==="template");
        //console.log("b:", budgies);
        //console.log("t:", tempies)
        this.props.getTemplates(tempies);
        this.props.getBudgets(budgies);
      }
    } )
    .catch(console.log)
  }

  findAndSetTemplate = (id) => {
    let tm = this.props.templates.find((t) => t.id === id )
    this.props.setTemplate(tm)
  }

  findAndSetBudget = (id) => {
    let bt = this.props.budgets.find(b => b.id === id )
    this.props.setTemplate(bt)
    //or just populate the ShowPage directly passing bt in as data?
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
              <Route path='/templates/:id' render={ (props) => <ShowTemplateContainer findAndSetTemplate={this.findAndSetTemplate} {...props} /> } />
              <Route path='/budgets/:id' render={(props) => <ShowBudgetContainer findAndSetBudget={this.findAndSetBudget} {...props} />} /> 
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

const mapStateToProps = ({ user, templates, budgets }) => {
  return {
    user,
    budgets,
    templates
  }
}
export default connect(mapStateToProps, { getCurrentUser, getTemplates, getBudgets, setTemplate, setBudget } )(App);
