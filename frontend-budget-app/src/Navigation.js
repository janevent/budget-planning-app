import React from 'react';
import LogOut from './LogOut.js';

export default class NavigationBar extends React.Component {
    //links to budgets list, templates list budget form, template form, log out, only displayed when logged in
    render(){
        return(
            <div className="nav-container">
                <div className="nav-bar">
                    
                    <LogOut/>
                    <br></br>
                    <p>>New Budget Template</p>
                    <br></br>
                    <p>New Budget</p>
                    <br></br>
                    <p>Budget Templates</p>
                    <br></br>
                    <p>Budgets</p>
                </div>
            </div>
        )
    }
}