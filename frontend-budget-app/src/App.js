import React from 'react';
//import logo from './logo.svg';
import './App.css';
import NewUser from './NewUser.js';
import User from './User.js';
import Navigation from './Navigation.js'
//import getcurrentuser action

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
      this.props.getCurrentUser();
    } )

  }

  componentDidMount(){
    //dispatch action w action.type GET_CURRENT_USER
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
     {/*</header>*/}
      <Navigation/>
      <NewUser/>
      <User/>
    </div>
  );
}

export default connect(null, { getCurrentUser } )(App);
