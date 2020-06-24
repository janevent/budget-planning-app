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

class DropDown extends React.Component {
    render(){
        //console.log("props:", this.props.items)
        
        //debugger
        
        return (
            <Router>
                <div>
                    <div className="wrapper">
                        <div className="header-title">{this.props.title}</div>
                        
                        <ul className="list">
                            { this.props.items.map( (i) => {
                                
                                return (
                                    <li className="list-item" key={i.id} onClick={ (e) => this.props.fetchAndSet(i.id)}>
                                        <Link to={this.props.link}>{i.attributes.title}</Link>
                                    </li>
                                )
                                })
                            }
                        </ul>
                    </div>
                    <Switch>
                        { this.props.items.map( (i) => {
                            return (
                                <>
                                <Route path='/template'>
                                    <ShowTemplateContainer />
                                </Route>
                                <Route path='/budget'>
                                    <ShowBudgetContainer />
                                </Route>
                                </>

                            )
                        })}
                    </Switch>
                </div>
           {// <li className="list-item" key={this.props.key}>{this.//props.item.title}</li>
    }
           </Router>
        )
    }
    
}

export default DropDown