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
import SaveNew from './SaveNew.js';

class NewTemplateForm extends React.Component {

    handleTitleChange = ( event) => {
        event.persist();
        const { name, value } = event.target
        this.props.updateTitle(value)
    }

    handleChange = (event, id) => {
        event.persist();
        let { name, value } = event.target;

        let newV = value;
        if(name==='amount'){
            newV = Array.from(value).filter( (c) => c !== ',')
        }
        let newValue = newV;
        if(Array.isArray(newV)){
            newValue = newV.join('');
        }
        console.log('newV', newValue)

        let ex = this.props.newTemplate.expenses.find( (e, i) => i === id )

        let newEx = Object.assign({}, ex, {[name]: newValue} )
        this.props.updateExpense(newEx, id)
        this.totalExpenditure();
        //console.log("tE:", this.props.newTemplate.totalExpenditure)
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

    handleExpenseMouseClick = () => {
        this.props.createNewExpense();
    }

    handleIncomeMouseClick = () => {
        this.props.createNewIncome();
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
       clearInterval(this.totEx)
       clearInterval(this.totIn)
       clearInterval(this.totDif)
    }

    render() {

        let listExpenses = this.props.newTemplate.expenses.map( (expense, index) => {
           
             return (
                 <ExpenseInput handleChange={this.handleChange} key={index} expense={expense} id={index} handleExpenseMouseClick={this.handleExpenseMouseClick} />
             )
         })

        let listIncomes = this.props.newTemplate.incomes.map( (income, index) =>
         {
             return (
                 <IncomeInput handleIncomeChange={this.handleIncomeChange} key={index} income={income} id={index} handleIncomeMouseClick={this.handleIncomeMouseClick} />
             )
        })

        return (
            <div className="NewTemplateForm">
                <h1 className="new-template-item">Create Your Budget Template</h1>

                <TitleForm title={this.props.newTemplate.title} handleTitleChange={this.handleTitleChange} />

                <h2 className="new-template-item">List Expenses</h2>
                <br></br>
                <form className="new-template-item">
                    {listExpenses}   
                </form>

                {this.props.template.totalExpenditure ? <p className="new-template-item total">Total Expenditure is ${this.props.template.totalExpenditure}</p> : "" }
                
                
                <br>
                </br>
                <h2 className="new-template-item">List Incomes</h2>
                <br></br>
                <form className="new-template-item">
                    {listIncomes}                   
                </form>

                {this.props.newTemplate.totalIncome ?
                <p className="new-template-item total">Total Income is ${this.props.newTemplate.totalIncome}</p> :
                "" }               
                <br>
                </br>
                {this.props.newTemplate.totalDifference ? 
                <p className="new-template-item total" >Total Difference is ${this.props.newTemplate.totalDifference}</p> :
                "" }
                <SaveNew save={this.props.save} />
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
