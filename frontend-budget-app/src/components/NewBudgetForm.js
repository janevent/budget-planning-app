import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js';
import TitleForm from './TitleForm.js';
import SaveNew from './SaveNew.js';

export default class NewBudgetForm extends React.Component {

    componentDidMount(){
        console.log('NewBudgetForm did mount');   
        this.totEx = setInterval( () => {
            this.props.totalExpenditure();
        }, 1000)
        this.totIn = setInterval( () => {
            this.props.totalIncome();
        }, 1000)
        this.totDif = setInterval( () => {
            this.props.setTotalDifference();
        }, 1000)
    }

    componentWillUnmount(){
        console.log("Budget Form App Dismounted")
        clearInterval(this.totEx)
        clearInterval(this.totIn)
        clearInterval(this.totDif)
    }
    
    render() {
        

        let listExpenses = this.props.newBudget.expenses.map( (expense, index) => {
           // console.log("expense:", expense)
             return (
                 <ExpenseInput handleChange={this.props.handleExpenseChange} key={index} expense={expense} id={index} handleExpenseMouseClick={this.props.createNewExpense} />
             )
         })
         //do I need both key and id
        let listIncomes = this.props.newBudget.incomes.map( (income, index) => {
             return (
                 <IncomeInput handleIncomeChange={this.props.handleIncomeChange} key={index} income={income} id={index} handleIncomeMouseClick={this.props.handleIncomeMouseClick} />
             )
        })

        return (
            <div className="NewBudgetForm">
                <h1 className="new-budget-item">Create Your Budget Template</h1>

                <TitleForm title={this.props.newBudget.title} handleTitleChange={this.props.handleTitleChange} />

                <h2 className="new-budget-item">List Expenses</h2>
                <br></br>
                <form className="new-budget-item">
                    {listExpenses}   
                </form>

                {this.props.newBudget.totalExpenditure ? <p className="new-budget-item total">Total Expenditure is {this.props.newBudget.totalExpenditure}</p> : "" }
                
                
                <br>
                </br>
                <h2 className="new-budget-item">List Incomes</h2>
                <br></br>
                <form className="new-budget-item">
                    {listIncomes}                   
                </form>

                {this.props.newBudget.totalIncome ?
                <p className="new-budget-item total">Total Income is {this.props.newBudget.totalIncome}</p> :
                "" }               
                <br>
                </br>
                {this.props.newBudget.totalDifference ? 
                <p className="new-budget-item total" >Total Difference is {this.props.newBudget.totalDifference}</p> :
                "" }
                <SaveNew save={this.props.save} />
            </div>
        )
    }
}