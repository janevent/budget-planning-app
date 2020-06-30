import React from 'react';
import LogOut from './LogOut.js';
import { connect } from 'react-redux';
import DropDown from './components/DropDown.js';
import setTemplate from './actions/showTemplate/setTemplate.js';
import setBudget from './actions/showBudget/setBudget.js';
import {
    Link
} from 'react-router-dom';

class NavigationBar extends React.Component {
    //links to budgets list, templates list budget form, template form, log out, only displayed when logged in
    // a fetch and set template
    //and a fetch and set budget methods

    fetchAndSetTemplate = (id) => {
        fetch(`http://localhost:3001/templates/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(res => res.json())
        .then(myjson => {
            if(myjson.error){
                alert(myjson.error)
            } else {
                console.log(myjson);
                let template = myjson.data.attributes;
                template.id = myjson.data.id;
                let expenses = myjson.included.filter((item)  => item.type === 'expense');
                let incomes = myjson.included.filter((item) => item.type === 'income')
                template.expenses = expenses;
                template.incomes = incomes;
                template.type = myjson.data.type
                //?
                console.log(this.props);
                this.props.setTemplate(template)
            }
        }).catch(console.log)
    }

    fetchAndSetBudget = (id) => {
        fetch(`http://localhost:3001/budgets/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(res => res.json())
        .then(myjson => {
            if(myjson.error){
                alert(myjson.error)
            } else {
                console.log(myjson);
                let budget = myjson.data.attributes;
                budget.id = myjson.data.id;
                let expenses = myjson.included.filter((item)  => item.type === 'expense');
                let incomes = myjson.included.filter((item) => item.type === 'income')
                budget.expenses = expenses;
                budget.incomes = incomes;
                budget.type = myjson.data.type
                //?
                console.log(this.props);
                this.props.setBudget(budget)
            }
        }).catch(console.log)
    }
 

    render(){
        const { templates, budgets } = this.props
        console.log(templates[0])
        return(
            <div className="nav-container">
                <div className="nav-bar">                
                    <div className="nav-item "><LogOut/></div>
                    <br></br>
                    <div className="nav-item" ><Link to='/new_template' className="high-light">New Budget Template</Link> </div>
                    <br></br>
                    <div className="nav-item"><Link to='/new_budget' className="high-light">New Budget</Link></div>
                    <br></br>
                    
                        
                        {/* <ul className="list">
                            {this.props.templates.map((t) => {
                                return <DropDown key={t.id} item={t.attributes}/>    
                            })}               
                        </ul> */}
                    
                    <div className="nav-item"><DropDown title="Select Template" items={templates} link='/template' fetchAndSet={this.fetchAndSetTemplate}/></div>
                    <br></br>
                    <div className="nav-item"><DropDown title="Select Budget" items={budgets} link= '/budget' fetchAndSet={this.fetchAndSetBudget}/></div> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ templates, budgets}) => {
    return {
        templates,
        budgets
    }
}

export default connect(mapStateToProps, { setTemplate, setBudget })(NavigationBar)
