import React from 'react';
import { connect } from 'react-redux';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewBudgetForm from './NewBudgetForm';

import createNewBudget from '../actions/newBudget/createNewBudget.js';

import setNewBudgetID from '../actions/newBudget/setNewBudgetID.js';

class NewBudgetFormContainer extends React.Component {
    //create a reducer to create a template, and update
    createNewBudgetForm = () => {
        let budget = {
                     title: "untitled",
                     expenses: [{description: "", amount: "0"}],
                     incomes: [{description: "", amount: "0"}],
                     totalIncome: null,
                     totalExpenditure: null,
                     totalDifference: null
        };
        console.log('props:', this.props)
        this.props.createNewBudget(budget)
    }

    save = () => {
        console.log(this.props.newBudget)
        let budgets = this.props.newBudget;
        fetch(('http://localhost:3001/budgets'),{
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                budget: {
                    title: budget.title,
                    total_income: budget.totalIncome,
                    total_expenditure: budget.totalExpenditure,
                    total_difference: budget.totalDifference,
                    expenses_attributes: budget.expenses,
                    incomes_attributes: budget.incomes
                }
            })
        })
        .then(response => response.json())
        .then(
            myjson => {
                console.log("mybudgetjson:", myjson)
                this.props.setNewBudgetID(myjson.data.id)
            }
        )
    }

    render(){
        return (
            <NewBudgetForm user={this.props.user} createNewBudget={this.createNewBudgetForm} newBudget={this.props.newBudget} save={this.save} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        newBudget: state.newBudget
    }
}

export default connect(mapStateToProps, {  createNewBudget, setNewBudgetID })(NewBudgetFormContainer)