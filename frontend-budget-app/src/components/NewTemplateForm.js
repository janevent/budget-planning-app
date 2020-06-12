import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js';
import TitleForm from './TitleForm.js'

//if inputs blank, set to 0 to calculate totals

export default class NewTemplateForm extends React.Component {

    constructor(){
        super();
        //console.log("constructorState1:", this.state)
        this.state = {
            title: "",
            expenses: [{description: "", amount: "0"}],
            incomes: [{description: "", amount: "0"}],
            totalIncome: null,
            totalExpenditure: null,
            totalDifference: null
        };
       // console.log("constructorState2:", this.state)
       // this.handleChange.bind(this)
    }

    //save to store or backend every 5 minutes?

    handleTitleChange = ( event) => {
        event.persist();
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
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
        //debugger

        this.totalExpenditure();
        console.log("tE:", this.state.totalExpenditure)
        this.setTotalDifference();
    
        
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
        console.log("state:", this.state)

        this.totalIncome();
        //aysynchronous or sychronus?
        this.setTotalDifference();

    }

    addFunc = (total, num) => {
        return total + num;
    }

    totalIncome = () => {
        let incomes = this.state.incomes.map((income, index) => {
            return parseFloat(income.amount);
            console.log("income.amount:", income.amount)
    
        })
        let newIncomes = incomes.filter((e) => e != NaN)
        let incomeTotal = newIncomes.reduce(this.addFunc, 0);
        console.log("incomeTotal:", incomeTotal)
        //isNaN
        
        this.setState({
            totalIncome: incomeTotal
            },
            () => {
             this.setTotalDifference(); 
            }
        );
        //this.setTotalDifference();
    }

    totalExpenditure = () => {
        let expenses = this.state.expenses.map((expense, index) => {
            return parseFloat(expense.amount)
            //if(!Number.isNaN(n)){
              //  return n
            //}
        })
        //debugger
        console.log("expenses:", expenses)
        let newExpenses = expenses.filter(Boolean)
        //reduce
        console.log("newexpenses:", newExpenses)
        let expenseTotal = newExpenses.reduce(this.addFunc, 0);
        console.log("et", expenseTotal)
        this.setState({
            totalExpenditure: expenseTotal
            },
            () => {
                this.setTotalDifference();
            }
        );
        //this.setTotalDifference();
    }

    createNewExpense = () => {
        this.setState({
            expenses: [...this.state.expenses, {description: "", amount: "0"}]
        })
    }

    handleExpenseMouseClick = () => {
        this.createNewExpense();
        //unless there are more then two empty expenses
    }

    createNewIncome = () => {
        this.setState({
            incomes: [...this.state.incomes, {description: "", amount: "0"}]
        })
    }

    handleIncomeMouseClick = () => {
        this.createNewIncome();
    }



    calculateTotalDifference = () => {
        let tE = this.state.totalExpenditure;
        let tI = this.state.totalIncome;
        console.log("tI:", tI, "tE:", tE)
        return tI - tE
    }

    setTotalDifference = () => {
        //let tD = this.calculateTotalDifference()
        let tE = this.state.totalExpenditure;
        let tI = this.state.totalIncome;
        console.log("tI:", tI, "tE:", tE)
        let tD =  tI - tE
        console.log("td:", tD)
        this.setState({
            totalDifference: tD
        })
    }

    //another function on an event handler for when a user moves away from input field, creates another empty expense in state

    //another function for the event of saving info - moving expenses into store

    
    //list of expenses
    render(){

        let listExpenses = this.state.expenses.map( (expense, index) => {
            console.log("expense:", expense)
            return (
                <ExpenseInput handleChange={this.handleChange} key={index} expense={expense} id={index} handleExpenseMouseClick={this.handleExpenseMouseClick} />
            )
        })

        let listIncomes = this.state.incomes.map( (income, index) =>
        {
            console.log("income:", income);
            return (
                <IncomeInput handleIncomeChange={this.handleIncomeChange} key={index} income={income} id={index} handleIncomeMouseClick={this.handleIncomeMouseClick} />
            )
        })
        //calculate total expenditure and income ..onChange..
        return (
            <div className="NewTemplateForm">
                <h1 className="new-template-item">Create Your Budget Template</h1>
                <TitleForm title={this.state.title} handleTitleChange={this.handleTitleChange} />
                <h2 className="new-template-item">List Expenses</h2>
                <br></br>
                <form className="new-template-item">
                    {listExpenses}   
                </form>
                {this.state.totalExpenditure ? <p className="new-template-item">Total Expenditure is {this.state.totalExpenditure}</p> : "" }
                
                
                <br>
                </br>
                <h2 className="new-template-item">List Incomes</h2>
                <br></br>
                <form className="new-template-item">
                    {listIncomes}
                </form>
                
                {this.state.totalIncome ? <p className="new-template-item">Total Income is {this.state.totalIncome}</p> : ""}
                <br>
                </br>
                {this.state.totalDifference ? 
                    <p className="new-template-item">{this.state.totalDifference}</p> :
                    ""}
            </div>
        )
    }
}

