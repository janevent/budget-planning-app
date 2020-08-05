import React from 'react';
import ShowTemplateContainer from './ShowTemplateContainer.js';
import ShowBudgetContainer from './ShowBudgetContainer.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

export default class DropDown extends React.Component {
    render(){
        
        return (          
                
                <div className="wrapper">
                   
                    <div className="header-title">{this.props.title}</div>
                        
                    <ul className="list">
                    { this.props.items.map((i)  => {                             
                        return (
                            <li className="list-item" key={i.id} >
                                <Link to={this.props.link(i.id)} >{i.title}</Link>
                            </li>
                        )
                    })
                    }
                    </ul>
                </div>          
        )
    }    
}

//
//

