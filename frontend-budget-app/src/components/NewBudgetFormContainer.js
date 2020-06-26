import React from 'react';
import { connect } from 'react-redux';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewBudgetForm from './NewBudgetForm.js';

import createNewBudget from '../actions/newBudget/createNewBudget.js';
import setNewBudgetID from '../actions/newBudget/setNewBudgetID.js';
import createNewExpense from '../actions/newBudget/createNewExpense.js';
import createNewIncome from '../actions/newBudget/createNewIncome.js';
import updateExpense from '../actions/newBudget/updateExpense.js';
import updateIncome from '../actions/newBudget/updateIncome.js';
import updateTitle from '../actions/newBudget/updateTitle.js';
import updateTotalDifference from '../actions/newBudget/updateTotalDifference.js';
import updateTotalExpense from '../actions/newBudget/updateTotalExpense.js';
import updateTotalIncome from '../actions/newBudget/updateTotalIncome.js';

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
        let budget = this.props.newBudget;
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

    handleTitleChange = ( event) => {
        event.persist();
        const { name, value } = event.target
        this.props.updateTitle(value)
    }
    handleExpenseChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;
        let ex = this.props.newBudget.expenses.find( (e, i) => i === id )
        let newEx = Object.assign({}, ex, {[name]: value} )
        this.props.updateExpense(newEx, id)
        this.totalExpenditure();
        //console.log("tE:", this.props.newTemplate.totalExpenditure)
        this.setTotalDifference();   

    }

    handleIncomeChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;
        let inc = this.props.newBudget.incomes.find((income, index) => index === id);
        let newInc = Object.assign( {}, inc, { [name]: value});
        this.props.updateIncome(newInc, id)
        this.totalIncome();       
        this.setTotalDifference();
    }

    totalIncome = () => {
        let incomes = this.props.newBudget.incomes.map((income, index) => {
             return parseFloat(income.amount);    
        })
        let newIncomes = incomes.filter(Boolean)
        let incomeTotal = newIncomes.reduce(this.addFunc, 0);
        this.props.updateTotalIncome(incomeTotal);
    }

    totalExpenditure = () => {
        let expenses = this.props.newBudget.expenses.map((expense) => {
             return parseFloat(expense.amount)            
        })        
        let newExpenses = expenses.filter(Boolean)
        let expenseTotal = newExpenses.reduce(this.addFunc, 0);
        this.props.updateTotalExpense(expenseTotal)
    }

    addFunc = (total, num) => {
        return total + num;
    }

    setTotalDifference = () => {   
        let tE = this.props.newBudget.totalExpenditure;
        let tI = this.props.newBudget.totalIncome;  
        let tD =  tI - tE   
        this.props.updateTotalDifference(tD);
    }

    //create new incomes and expenses

    handleCreateNewIncome = (event) => {
        event.persist();
        this.props.createNewIncome();
    }

    handleCreateNewExpense = (event) => {
        event.persist();
        this.props.createNewExpense();
    }

    render(){
        return (
            <NewBudgetForm user={this.props.user} createNewBudget={this.createNewBudgetForm} newBudget={this.props.newBudget} save={this.save} handleExpenseChange={this.handleExpenseChange} setTotalDifference={this.setTotalDifference} totalExpenditure={this.totalExpenditure} handleIncomeChange={this.handleIncomeChange} totalIncome={this.totalIncome} createNewIncome={this.handleCreateNewIncome} createNewExpense={this.handleCreateNewExpense} handleTitleChange={this.handleTitleChange} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        newBudget: state.newBudget
    }
}

export default connect(mapStateToProps, { createNewBudget, createNewIncome, createNewExpense, setNewBudgetID, updateExpense, updateIncome, updateTitle, updateTotalDifference, updateTotalExpense, updateTotalIncome })(NewBudgetFormContainer)