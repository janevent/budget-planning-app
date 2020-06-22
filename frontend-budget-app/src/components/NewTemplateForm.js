import React from 'react';
import ExpenseInput from './ExpenseInput.js';
import IncomeInput from './IncomeInput.js';
import TitleForm from './TitleForm.js';
import { connect } from 'react-redux';
import updateTitle from '../actions/newTemplate/updateTitle.js';
import updateExpense from '../actions/newTemplate/updateExpense.js';
import updateIncome from '../actions/newTemplate/updateIncome.js';
import updateTotalExpense from '../actions/newTemplate/updateTotalExpense.js';
import updateTotalIncome from '../actions/newTemplate/updateTotalIncome.js'
import updateTotalDifference from '../actions/newTemplate/updateTotalDifference.js'
import createNewExpense from '../actions/newTemplate/createNewExpense.js';
import createNewIncome from '../actions/newTemplate/createNewIncome.js';
import SaveNewTemplate from './SaveNewTemplate.js';

//if inputs blank, set to 0 to calculate totals

class NewTemplateForm extends React.Component {
    //save to store or backend every 5 minutes?

    handleTitleChange = ( event) => {
        event.persist();
        const { name, value } = event.target
        this.props.updateTitle(value)
    }

    handleChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;
        let ex = this.props.newTemplate.expenses.find( (e, i) => i === id )
        let newEx = Object.assign({}, ex, {[name]: value} )
        this.props.updateExpense(newEx, id)
        this.totalExpenditure();
        console.log("tE:", this.props.newTemplate.totalExpenditure)
        this.setTotalDifference();    
    }

    handleIncomeChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;
        let inc = this.props.newTemplate.incomes.find((income, index) => index === id);
        let newInc = Object.assign( {}, inc, { [name]: value});
        this.props.updateIncome(newInc, id)
        this.totalIncome();
       
        this.setTotalDifference();
    }

    addFunc = (total, num) => {
        return total + num;
    }

    totalIncome = () => {
        let incomes = this.props.newTemplate.incomes.map((income, index) => {
             return parseFloat(income.amount);    
        })
        let newIncomes = incomes.filter(Boolean)
        let incomeTotal = newIncomes.reduce(this.addFunc, 0);
        this.props.updateTotalIncome(incomeTotal);
    }

    totalExpenditure = () => {
        let expenses = this.props.newTemplate.expenses.map((expense) => {
             return parseFloat(expense.amount)            
        })
        
        let newExpenses = expenses.filter(Boolean)
        let expenseTotal = newExpenses.reduce(this.addFunc, 0);
        this.props.updateTotalExpense(expenseTotal)
    }

    createNewExpense = () => {
        this.props.createNewExpense();
    }

    handleExpenseMouseClick = () => {
        this.createNewExpense();
    }

    createNewIncome = () => {
        this.props.createNewIncome();
    }

    handleIncomeMouseClick = () => {
        this.createNewIncome();
    }

    setTotalDifference = () => {   
        let tE = this.props.newTemplate.totalExpenditure;
        let tI = this.props.newTemplate.totalIncome;  
        let tD =  tI - tE   
        this.props.updateTotalDifference(tD);
    }

    componentDidMount(){
        console.log('NewTemplateForm did mount');   
        this.totEx = setInterval( () => {
            this.totalExpenditure();
        }, 1000)
        this.totIn = setInterval( () => {
            this.totalIncome();
        }, 1000)
        this.totDif = setInterval( () => {
            this.setTotalDifference();
        }, 1000)
    }

    componentWillUnmount(){
        console.log("TemplateForm App Dismounted")
        //fetch request to find or create a template //or save button
       //clearInterval(this.updateTem)
       clearInterval(this.totEx)
       clearInterval(this.totIn)
       clearInterval(this.totDif)
    }

    //another function on an event handler for when a user moves away from input field, creates another empty expense in state

    //another function for the event of saving info - moving expenses into store

    
    //list of expenses
    render() {
        console.log('props:', this.props)
        //find listExpenses from global state template.expenses passed in as props from container
        //map over and display <ExpenseInput/>

        let listExpenses = this.props.newTemplate.expenses.map( (expense, index) => {
            console.log("expense:", expense)
             return (
                 <ExpenseInput handleChange={this.handleChange} key={index} expense={expense} id={index} handleExpenseMouseClick={this.handleExpenseMouseClick} />
             )
         })

        let listIncomes = this.props.newTemplate.incomes.map( (income, index) =>
         {
             console.log("income:", income);
             return (
                 <IncomeInput handleIncomeChange={this.handleIncomeChange} key={index} income={income} id={index} handleIncomeMouseClick={this.handleIncomeMouseClick} />
             )
        })
        
        var message = "total"
        // if(this.state.totalDifference && this.state.totalDifference >= 0){
        //    message = ( <p className="new-template-item total">Your balance is {this.state.totalDifference}.  Consider adding to your rainy days savings.</p> )
        // }else if(this.state.totalDifference && this.state.totalDifference < 1 ){
        //     message = (<p className="new-template-item total">Your balance is {this.state.totalDifference}</p>)
        // }else{
        //     message = ""
        // }

        return (
            <div className="NewTemplateForm">
                <h1 className="new-template-item">Create Your Budget Template</h1>

                <TitleForm title={this.props.newTemplate.title} handleTitleChange={this.handleTitleChange} />

                <h2 className="new-template-item">List Expenses</h2>
                <br></br>
                <form className="new-template-item">
                    {listExpenses}   
                </form>

                {this.props.template.totalExpenditure ? <p className="new-template-item total">Total Expenditure is {this.props.template.totalExpenditure}</p> : "" }
                
                
                <br>
                </br>
                <h2 className="new-template-item">List Incomes</h2>
                <br></br>
                <form className="new-template-item">
                    {listIncomes}                   
                </form>

                {this.props.newTemplate.totalIncome ?
                <p className="new-template-item total">Total Income is {this.props.newTemplate.totalIncome}</p> :
                "" }               
                <br>
                </br>
                {this.props.newTemplate.totalDifference ? 
                <p className="new-template-item total" >Total Difference is {this.props.newTemplate.totalDifference}</p> :
                "" }
                <SaveNewTemplate save={this.props.save} />
            </div>
        )
    }
}

const mapStateToProps = ({ newTemplate }) => {
    return {
        newTemplate
    }
}

export default connect(mapStateToProps, { updateTitle, updateExpense, updateIncome, updateTotalExpense, updateTotalIncome, updateTotalDifference, createNewExpense, createNewIncome } )(NewTemplateForm);
