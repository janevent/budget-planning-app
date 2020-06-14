import React from 'react';
import LogOut from './LogOut.js';
import { connect } from 'react-redux';
import DropDown from './components/DropDown.js';

export default class NavigationBar extends React.Component {
    //links to budgets list, templates list budget form, template form, log out, only displayed when logged in
    state = {
        templates: [
            {
                id:0,
                title: 'May',
                key: 'templates',
                selected: false
            },
            { 
                id: 1,
                title: '2020',
                key: 'templates',
                selected: false
            }
        ]
    }

    render(){
        return(
            <div className="nav-container">
                <div className="nav-bar">
                    
                    <p className="nav-item"><LogOut/></p>
                    <br></br>
                    <p className="nav-item"> New Budget Template </p>
                    <br></br>
                    <p className="nav-item">  New Budget  </p>
                    <br></br>
                    <p className="nav-item"><DropDown title="Select Template" items={this.state.templates}/></p>
                    <br></br>
                    <p className="nav-item"> Budgets </p>
                </div>
            </div>
        )
    }
}