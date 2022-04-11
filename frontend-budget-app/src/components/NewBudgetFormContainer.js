import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewBudgetForm from './NewBudgetForm.js';
import TransferDropDown from './TransferDropDown.js';
import ClearForm from './ClearForm.js';

import fetchAndAddBudget from '../actions/budgets/addBudget.js';
//import createNewBudget from '../actions/newBudget/createNewBudget.js';
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

    save = () => {
        console.log(this.props.newBudget)
        let budget = this.props.newBudget;
        let expenses = budget.expenses.filter( (e) => e.description!== "");
        let incomes = budget.incomes.filter( (i) => i.description!== "" );
        console.log('expenses:', expenses);
        console.log('incomes:', incomes);
       
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
        const { value } = event.target
        this.props.updateTitle(value)
    }

    handleExpenseChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;
        let ex = this.props.newBudget.expenses.find( (e, i) => i === id )
        let newEx = Object.assign({}, ex, {[name]: value} )
        this.props.updateExpense(newEx, id)
        this.totalExpenditure();
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
        let { totalExpenditure, totalIncome } = this.props.newBudget;       
        let totalDifference =  totalIncome - totalExpenditure;  
        this.props.updateTotalDifference(totalDifference);
    }

    //create new incomes and expenses

    handleCreateNewIncome = (event) => {
        let filteredIncomes = this.props.newBudget.incomes.filter( (income) => {
            return income.description === "" && income.amount === "0"
        })
        let numOfEmptyInc = filteredIncomes.length;
        if(numOfEmptyInc < 3){
            this.props.createNewIncome();
        }
    }

    handleCreateNewExpense = (event) => {
        let filteredExpenses = this.props.newBudget.expenses.filter( (expense) => {
            return expense.description === "" && expense.amount === "0"
        });
        let numOfEmptyExp = filteredExpenses.length;
        if(numOfEmptyExp < 3){
            this.props.createNewExpense();
        }
    }

    render(){
        return (
            <div className='container'>
                <div className="to-the-left"> 
                    <TransferDropDown />
                    <ClearForm clearForm={this.props.clearNewBudget} />
                </div>
                <NewBudgetForm user={this.props.user} newBudget={this.props.newBudget} save={this.save} handleExpenseChange={this.handleExpenseChange} setTotalDifference={this.setTotalDifference} totalExpenditure={this.totalExpenditure} handleIncomeChange={this.handleIncomeChange} totalIncome={this.totalIncome} createNewIncome={this.handleCreateNewIncome} createNewExpense={this.handleCreateNewExpense} handleTitleChange={this.handleTitleChange}  />
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

export default withRouter(connect(mapStateToProps, { createNewIncome, createNewExpense, setNewBudgetID, updateExpense, updateIncome, updateTitle, updateTotalDifference, updateTotalExpense, updateTotalIncome, clearNewBudget, fetchAndAddBudget })(NewBudgetFormContainer));