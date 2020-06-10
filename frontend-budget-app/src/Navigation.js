import React from 'react';
import LogOut from './LogOut.js';

export default class NavigationBar extends React.Component {
    //links to budgets list, templates list budget form, template form, log out, only displayed when logged in
    render(){
        return(
            <div className="nav-container">
                <div className="nav-bar">
                    <p>Navigation</p>
                    <LogOut/>
                </div>
            </div>
        )
    }
}