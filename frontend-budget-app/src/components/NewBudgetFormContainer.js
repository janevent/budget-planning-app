import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewBudgetForm from './NewBudgetForm.js';
import UploadDropDown from './UploadDropDown.js';
import ClearForm from './ClearForm.js';

import fetchAndAddBudget from '../actions/budgets/addBudget.js';
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
import clearNewBudget from '../actions/newBudget/clearNewBudget.js';

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
        let expenses = budget.expenses.filter( (e) => e.description!== "");
        let incomes = budget.incomes.filter( (i) => i.description!== "" );
        console.log('expenses:', expenses);
        console.log('incomes:', incomes);
       // debugger
       let b = {
            title: budget.title,
            total_income: budget.totalIncome,
            total_expenditure: budget.totalExpenditure,
            total_difference: budget.totalDifference,
            expenses_attributes: expenses,
            incomes_attributes: incomes
        }
        this.props.fetchAndAddBudget(b);
        this.props.history.push('/')
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
            <div className='container'>
                <div className="to-the-left"> 
                    <UploadDropDown />
                    <ClearForm clearForm={this.props.clearNewBudget} />
                </div>
                <NewBudgetForm user={this.props.user} createNewBudget={this.createNewBudgetForm} newBudget={this.props.newBudget} save={this.save} handleExpenseChange={this.handleExpenseChange} setTotalDifference={this.setTotalDifference} totalExpenditure={this.totalExpenditure} handleIncomeChange={this.handleIncomeChange} totalIncome={this.totalIncome} createNewIncome={this.handleCreateNewIncome} createNewExpense={this.handleCreateNewExpense} handleTitleChange={this.handleTitleChange}  />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        newBudget: state.newBudget
    }
}

export default withRouter(connect(mapStateToProps, { createNewBudget, createNewIncome, createNewExpense, setNewBudgetID, updateExpense, updateIncome, updateTitle, updateTotalDifference, updateTotalExpense, updateTotalIncome, clearNewBudget, fetchAndAddBudget })(NewBudgetFormContainer));