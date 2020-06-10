import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js';

export default class NewTemplateForm extends React.Component {

    constructor(){
        super();
        //console.log("constructorState1:", this.state)
        this.state = {
            expenses: [{description: "", amount: ""}]
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
        let newEx = Object.assign( ex, { [name]: value})
        let firstPart = this.state.expenses.slice(0, id);
        let lastPart = this.state.expenses.slice(id+1);

        this.setState({
           expenses: [ ...firstPart, newEx, ...lastPart]
        })
    }

    handleIncomeChange = (event) => {
        event.persist();
        let { name, value } = event.target;

        let in = this.state.incomes.find()
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
        
        return (
            <div>
                <h2>List Expenses</h2>
                <br></br>
                <form>
                    {listExpenses}   
                </form>
                <br>
                </br>
                <h2>List Incomes</h2>
                <br></br>
                <form>
                    <IncomeInput/>
                </form>

            </div>
        )
    }
}

