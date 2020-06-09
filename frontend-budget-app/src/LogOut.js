import React from 'react';
import { connect } from 'react-redux';
import './index.css'
import logOutUser from './actions/logOut.js'

class LogOut extends React.Component {
    render(){
        <form>
            <input type="submit" value="Log Out" />
        </form>
    }
}

export default connect(null, { logOutUser })(LogOut);
