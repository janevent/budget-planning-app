import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import logOutUser from './actions/logOut.js'

class LogOut extends React.Component {

    handleLogOut = (event) => {
        //debugger
        event.preventDefault();
        console.log('logging out')
        console.log('props:', this.props)
        fetch('http://localhost:3001/logout', {
            credentials: 'include',

            //method: 'DELETE'
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then( r => r.json())
        .then(myjson => console.log("logout", myjson))
        this.props.logOutUser();
    }

    render(){
        return (
        <form onSubmit={this.handleLogOut}>
            <input type="submit" value="Log Out" />
        </form>
        )
    }
}

export default connect(null, { logOutUser })(LogOut);
