import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import fetchLogOutUser from './actions/logOut.js'

class LogOut extends React.Component {

    handleLogOut = (event) => {
        //debugger
        event.preventDefault();
        console.log('logging out')
        

        fetch('http://localhost:3001/logout', {
            credentials: 'include',
            headers: {
               'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then( r => r.json())
        .then(myjson => console.log("logout", myjson))

        this.props.fetchLogOutUser();
    }

    render(){
        return (
        <form onSubmit={this.handleLogOut}>
            <input type="submit" className="bttn" value="Log Out" />
        </form>
        )
    }
}

export default connect(null, { fetchLogOutUser })(LogOut);
