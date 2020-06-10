import React from 'react';
//import logo from './logo.svg';
import './App.css';
import NewUser from './NewUser.js';
import User from './User.js';
import NavigationBar from './Navigation.js';
import getCurrentUser from './actions/getCurrentUser.js';
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
      this.props.getCurrentUser(myjson);
    } )

  }

  componentDidMount(){
    //dispatch action w action.type GET_CURRENT_USER
    this.getUser();
  }

  render(){
    return (
      this.props.user ? <NavigationBar/> :
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
export default connect(mapStateToProps, { getCurrentUser } )(App);
