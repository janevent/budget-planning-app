import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js';

export default class NewTemplateForm extends React.Component {

    constructor(){
        super();
        //console.log("constructorState1:", this.state)
        this.state = {
            expenses: [{description: "", amount: ""}],
            incomes: [{description: "", amount: ""}],
            totalIncome: null,
            totalExpenditure: null
        };
       // console.log("constructorState2:", this.state)
       // this.handleChange.bind(this)
    }

    handleChange = (event, id) => {
        //
        event.persist();
        console.log("handleChangeState:", this.state)
        console.log("event", event)
        console.log("id", id)
        let { name, value } = event.target;

        let ex = this.state.expenses.find((e, index) => index === id)
        let newEx = Object.assign( ex, { [name]: value});
        let firstPart = this.state.expenses.slice(0, id);
        let lastPart = this.state.expenses.slice(id+1);

        this.setState({
           expenses: [ ...firstPart, newEx, ...lastPart]
        })

        this.totalExpenditure();
        this.createNewExpense();
    }

    handleIncomeChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;

        let inc = this.state.incomes.find((income, index) => index === id);
        let newInc = Object.assign(inc, { [name]: value});
        let firstPart = this.state.incomes.slice(0, id);
        let lastPart = this.state.incomes.slice(id+1);

        this.setState({
            incomes: [ ...firstPart, newInc, ...lastPart]
        })

        this.totalIncome();

    }

    addFunc = (total, num) => {
        return total + num;
    }
//totalExpenditure
    totalIncome = () => {
        let incomes = this.state.incomes.map((income, index) => {
            return parseFloat(income.amount)
        })
        //reduce
        let incomeTotal = incomes.reduce(this.addFunc);
        this.setState({
            totalIncome: incomeTotal
        })
    }

    totalExpenditure = () => {
        let expenses = this.state.expenses.map((expense, index) => {
            return parseFloat(expense.amount)
        })
        //reduce
        let expenseTotal = expenses.reduce(this.addFunc);
        this.setState({
            totalExpenditure: expenseTotal
        })
    }

    createNewExpense = () => {
        this.setState({
            expenses: [...this.state.expenses, {description: "", amount: ""}]
        })
    }

    //another function on an event handler for when a user moves away from input field, creates another empty expense in state

    //another function for the event of saving info - moving expenses into store

    
    //list of expenses
    render(){

        let listExpenses = this.state.expenses.map( (expense, index) => {
            console.log("expense:", expense)
            return (
                <ExpenseInput handleChange={this.handleChange} key={index} expense={expense} id={index} />
            )
        })

        let listIncomes = this.state.incomes.map( (income, index) =>
        {
            console.log("income:", income);
            return (
                <IncomeInput handleIncomeChange={this.handleIncomeChange} key={index} income={income} id={index} />
            )
        })
        //calculate total expenditure and income ..onChange..
        return (
            <div>
                <h2>List Expenses</h2>
                <br></br>
                <form>
                    {listExpenses}   
                </form>
                {this.state.totalExpenditure ? <p>Total Expenditure is {this.state.totalExpenditure}</p> : "" }
                
                
                <br>
                </br>
                <h2>List Incomes</h2>
                <br></br>
                <form>
                    {listIncomes}
                </form>
                
                {this.state.totalIncome ? <p>Total Income is {this.state.totalIncome}</p> : ""}

            </div>
        )
    }
}

