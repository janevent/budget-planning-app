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

    // fetchAndSetTemplate = (id) => {
    //     fetch(`http://localhost:3001/templates/${id}`, {
    //         credentials: 'include',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(myjson => {
    //         if(myjson.error){
    //             alert(myjson.error)
    //         } else {
    //             console.log(myjson);
    //             let template = myjson.data.attributes;
    //             template.id = myjson.data.id;
    //             let expenses = myjson.included.filter((item)  => item.type === 'expense');
    //             let incomes = myjson.included.filter((item) => item.type === 'income')
    //             template.expenses = expenses;
    //             template.incomes = incomes;
    //             template.type = myjson.data.type
    //             //?
    //             console.log(this.props);
    //             this.props.setTemplate(template)
    //         }
    //     }).catch(console.log)
    // }

    // fetchAndSetBudget = (id) => {
    //     fetch(`http://localhost:3001/budgets/${id}`, {
    //         credentials: 'include',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(myjson => {
    //         if(myjson.error){
    //             alert(myjson.error)
    //         } else {
    //             console.log(myjson);
    //             let budget = myjson.data.attributes;
    //             budget.id = myjson.data.id;
    //             let expenses = myjson.included.filter((item)  => item.type === 'expense');
    //             let incomes = myjson.included.filter((item) => item.type === 'income')
    //             budget.expenses = expenses;
    //             budget.incomes = incomes;
    //             budget.type = myjson.data.type
    //             //?
    //             console.log(this.props);
    //             this.props.setBudget(budget)
    //         }
    //     }).catch(console.log)
    // }

    templateLink = (id) => {
        return `/templates/${id}`
    }

    budgetLink = (id) => {
        return `/budgets/${id}`
    }
 

    render(){
        const { templates, budgets } = this.props
        //console.log(templates)
        return(
            <nav className="nav-container">
                <input type="checkbox" id="nav-checkbox"></input>  
                    <label for="nav-checkbox" className="nav-toggle">
                        <p className="open">Open</p>
                        <p className="close">Close</p>
                    </label>     
                <div className="nav-bar">
                   
                    <div className="nav-item logout"><LogOut/></div>
                    <br></br>
                    <div className="nav-item" ><div className="w"><Link to='/new_template' className="high-light link" >New Budget Template</Link> </div></div>
                    <br></br>
                    <div className="nav-item"><div className="w"><Link to='/new_budget' className="high-light link" >New Budget</Link></div></div>
                    <br></br>                      
                    <div className="nav-item"><DropDown title="Select Template" items={templates} link={this.templateLink} /></div>
                    <br></br>
                    <div className="nav-item"><DropDown title="Select Budget" items={budgets} link={this.budgetLink} /></div> 
                </div>
                
            </nav>
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
