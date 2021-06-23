import React from 'react';
import {
    Link,
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
                                <Link  className="link" to={this.props.link(i.id)} >{i.title}</Link>
                            </li>
                        )
                    })
                    }
                    </ul>
                </div>          
        )
    }    
}
