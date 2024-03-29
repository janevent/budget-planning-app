import React from 'react';
import {
    Link,
  } from "react-router-dom";

export default class DropDown extends React.Component {
    render(){      
        return (          
                <div className="wrapper">
                    <div className="high-light link header-title">{this.props.title}</div>   
                    {this.props.items.length>0 ?                  
                        <ul className="list">                       
                            {this.props.items.map((i)  => {                             
                                return (
                                    <li className="list-item" key={i.id} >
                                        <Link  className="link high-light list-item-child" to={this.props.link(i.id)} >{i.title}</Link>
                                    </li>
                                )
                            })
                            }
                    
                        </ul>
                    :
                    "" }
                    
                </div>          
        )
    }    
}
