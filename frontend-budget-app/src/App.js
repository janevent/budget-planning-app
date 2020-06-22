import React from 'react';
//import logo from './logo.svg';
import './App.css';
import NewUser from './NewUser.js';
import User from './User.js';
import NavigationBar from './Navigation.js';
import NewTemplateFormContainer from './components/NewTemplateFormContainer.js';
import getCurrentUser from './actions/getCurrentUser.js';
import getTemplates from './actions/getTemplates.js';
import getBudgets from './actions/getBudgets.js';
import LogOut from './LogOut.js';
import { connect } from 'react-redux';

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
      //console.log("user:", myjson.data.attributes)
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
      //get budgets
      //get templates
    } )

  }

  componentDidMount(){
    console.log("App did mount")
    //dispatch action w action.type GET_CURRENT_USER
    this.getUser();
  }

  render(){
    return (
      this.props.user ? 
        <div>
          <NavigationBar/>  
          <NewTemplateFormContainer />
        </div>:
      <div className="App">
        <NewUser/>
        <User/>
      </div>
    );
  };
};

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}
export default connect(mapStateToProps, { getCurrentUser, getTemplates, getBudgets } )(App);
