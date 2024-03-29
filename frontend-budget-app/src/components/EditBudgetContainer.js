import EditForm from'./EditForm';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import addNewExpense from '../actions/editBudget/addNewExpense';
import addNewIncome from '../actions/editBudget/addNewIncome';
import fetchEditBudget from '../actions/editBudget/fetchEditBudget';
import updateExpense from '../actions/editBudget/updateExpense';
import updateIncome from '../actions/editBudget/updateIncome';
import updateTitle from '../actions/editBudget/updateTitle';
import updateTotalDifference from '../actions/editBudget/updateTotalDifference';
import updateTotalExpenditure from '../actions/editBudget/updateTotalExpenditure';
import updateTotalIncomes from '../actions/editBudget/updateTotalIncomes';

function EditBudgetContainer(props){

    function getBudget(){
        let id = props.match.params.id;
        console.log('id', id, 'budgets', props.budgets)
        let budget = props.budgets.find( (bud) => bud.id === id )       
        return budget
    }

    function handleTitleChange(event){
        event.persist();
        let iD = props.match.params.id;
        console.log('id', iD)
        console.log('value', event.target.value)
        props.updateTitle(event.target.value, iD)
    }

    function handleIncomeChange(event, incomeId){
        const { name, value } = event.target;
        let budget = getBudget();
        //let income = budget.incomes.find( income => income.id === incomeId);
        let income = budget.incomes[incomeId]
        console.log('budget', budget, 'income', income, 'incomeId', incomeId)
        let updatedAttributes = {...income.attributes, ...{[name]: value} };
        let updatedIncome = {...income, ...{attributes: updatedAttributes}}
        let budgetId = props.match.params.id;
        console.log('updatedIncome', updatedIncome, 'incomdId', incomeId, 'budgetId', budgetId)
        props.updateIncome(updatedIncome, incomeId, budgetId)
        //totalIncomes();
    }

    function handleExpenseChange(event, expenseId){
        event.persist();
        const { name, value } = event.target;
        let budget = getBudget();
        console.log('budget', budget)
        let budgetId = props.match.params.id;
        //const matchExpense = (expense) => expense.id === expenseId
        //let expense = budget.expenses.find( matchExpense );
        let expense = budget.expenses[expenseId]
        let updatedAttributes = {...expense.attributes, ...{[name]:value}}
        let updatedExpense = {...expense, ...{ attributes: updatedAttributes} }
        //console.log('updatedExpense:', updatedExpense)
        props.updateExpense(updatedExpense, expenseId, budgetId);
        //totalExpenses();
    }

    function totalExpenses(){
        console.log('budgets', props.budgets)
        let budget = getBudget()
        console.log(budget)
        //debugger
        let expenses = budget.expenses.map( (expense) => {
            //debugger
            return parseInt(expense.attributes.amount) })
        //debugger
        let totalExs = expenses.reduce(addFunc, 0);
        let budgetId = props.match.params.id;    
        props.updateTotalExpenditure(totalExs, budgetId);
    }

    function totalIncomes(){
        //debugger
        let incomes = getBudget().incomes.map( (income) => {
            return parseInt(income.attributes.amount)
        });
        let totalIncome = incomes.reduce(addFunc, 0);
        let budgetId = props.match.params.id;
        console.log('updatedTotalIncome', totalIncome)
        props.updateTotalIncomes(totalIncome, budgetId)
    }

    function addFunc(total, number){
        return total + number
    }

    function totalDifference(){
        let budgetId = props.match.params.id
        let budget = props.budgets.find(t => t.id === budgetId)
        let totalDif = budget.total_income - budget.total_expenditure;
        props.updateTotalDifference(totalDif, budgetId)
    }

    const saveEdit = () => {        
        let budget = getBudget();
        //temp as argument...
        console.log('reached SaveEdit')
        let filteredIncomes = budget.incomes.filter( (i) => {
            return i.attributes.description !== ""
        });
        let filteredExpenses = budget.expenses.filter( (e) => {
            return e.attributes.description !== ""
        });
        let copyIncomes = [...filteredIncomes];
        let copyExpenses = [...filteredExpenses];
        copyIncomes.forEach( (i) => i.attributes.id = i.id);
        //if i.id exists set id in attributes, else skip
        copyExpenses.forEach( (e) => e.attributes.id = e.id);
        let newIncomes = copyIncomes.map( (income) => income.attributes);
        let newExpenses = copyExpenses.map( (expense) => expense.attributes);
        let newBudget = {
            title: budget.title,
            total_income: budget.total_income,
            total_expenditure: budget.total_expenditure,
            total_difference: budget.total_difference,
            expenses_attributes: newExpenses,
            incomes_attributes: newIncomes,
            id: budget.id
        }
        props.fetchEditBudget(newBudget, budget.id);
        props.history.push(`/budgets/${budget.id}`)
    }

    const onClickAddExpense = () => {
        let budgetId = props.match.params.id;
        console.log('once budgetId', budgetId)
        props.addNewExpense(budgetId);
    }

    const onClickAddIncome = () => {
        let budgetId = props.match.params.id;
        console.log('onci budgetId', budgetId)
        props.addNewIncome(budgetId);
    }
    useEffect(() => {
        //this.setTotalExpenses = setInterval( () => { this.totalExpenses() }, 1000 )
            let setTotalExpenses = setInterval(() => { 
                return props.budgets.length > 0 ? totalExpenses() : '' }, 5000)
            let setTotalIncomes = setInterval( () => { 
                return props.budgets.length > 0 ? totalIncomes() : '' }, 5000)
            let setTotalDifference = setInterval( () => {
                return props.budgets.length > 0 ? totalDifference() : ' '}, 5000)

            let budgetId = props.match.params.id;
            console.log(budgetId)
            console.log('budgets', props.budgets)
            setTimeout(() => {
                props.addNewIncome(budgetId)
            }, 5000)
            setTimeout(() => {
                props.addNewExpense(budgetId)
            }, 5000)
            return function cleanUp(){
                clearInterval(setTotalExpenses);
                clearInterval(setTotalIncomes);
                clearInterval(setTotalDifference)
            }
        }, []
        )

    return (
        <div className='edit-container'>
            {props.budgets.length > 0?
                <EditForm saveEdit={saveEdit} data={getBudget()} handleTitleChange={handleTitleChange} type={'Budget'}  handleIncomeChange={handleIncomeChange} handleExpenseChange={handleExpenseChange} onClickAddIncome={onClickAddIncome} onClickAddExpense={onClickAddExpense} />
            : ''
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        budgets: state.budgets 
    }
}

export default withRouter(connect(mapStateToProps,{addNewExpense, addNewIncome, fetchEditBudget, updateExpense, updateIncome, updateTitle, updateTotalDifference, updateTotalExpenditure, updateTotalIncomes })(EditBudgetContainer))

