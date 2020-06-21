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


//if inputs blank, set to 0 to calculate totals

class NewTemplateForm extends React.Component {

    //  constructor(props){
    //      super(props);
    //      console.log("props:", props)
    //      let template = {
    //         title: "untitled",
    //         expenses: [{description: "", amount: "0"}],
    //         incomes: [{description: "", amount: "0"}],
    //         totalIncome: null,
    //         totalExpenditure: null,
    //         totalDifference: null
    //         };
    //      props.createTemplate(template);
    //      console.log("props2:", props)
    // }

    //save to store or backend every 5 minutes?

    handleTitleChange = ( event) => {
        event.persist();
        const { name, value } = event.target
        this.props.updateTitle(value)
    }

    handleChange = (event, id) => {
        //
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
        //aysynchronous or sychronus?
        this.setTotalDifference();

    }

    addFunc = (total, num) => {
        return total + num;
    }

    totalIncome = () => {
        // let incomes = this.state.incomes.map((income, index) => {
        //     return parseFloat(income.amount);
        //     console.log("income.amount:", income.amount)
    
        // })
        //let newIncomes = incomes.filter((e) => e != NaN)
        //let incomeTotal = newIncomes.reduce(this.addFunc, 0);
        //console.log("incomeTotal:", incomeTotal)
        //isNaN
        
        // this.setState({
        //     totalIncome: incomeTotal
        //     },
        //     () => {
        //      this.setTotalDifference(); 
        //     }
        // );
    }

    totalExpenditure = () => {
        let expenses = this.props.newTemplate.expenses.map((expense, index) => {
             return parseFloat(expense.amount)            
        })
        //console.log("expenses:", expenses)
        let newExpenses = expenses.filter(Boolean)
        //reduce
        //console.log("newexpenses:", newExpenses)
        let expenseTotal = newExpenses.reduce(this.addFunc, 0);
        //console.log("expenseTotal:", expenseTotal)
        this.props.updateTotalExpense(expenseTotal)
        
       //set global state attribute totalExpenditure //call setTotalDifference
    }

    createNewExpense = () => {
        this.props.createNewExpense();
        // this.setState({
        //     expenses: [...this.state.expenses, {description: "", amount: "0"}]
        // })
        //set global state - add expense - through function passed in as props
    }

    handleExpenseMouseClick = () => {
        this.createNewExpense();
        //unless there are more then two empty expenses
    }

    createNewIncome = () => {
        this.props.createNewIncome();
        // this.setState({
        //     incomes: [...this.state.incomes, {description: "", amount: "0"}]
        // })
        //add to global state through a  function passed in as props
    }

    handleIncomeMouseClick = () => {
        this.createNewIncome();
    }


//not necessary
    calculateTotalDifference = () => {
        let tE = this.state.totalExpenditure;
        let tI = this.state.totalIncome;
        console.log("tI:", tI, "tE:", tE)
        return tI - tE
    }

    setTotalDifference = () => {
       
      //  let tE = this.state.totalExpenditure;
      //  let tI = this.state.totalIncome;
      //grab attributes from global state sent down from container
        //console.log("tI:", tI, "tE:", tE)
        //let tD =  tI - tE
        //console.log("td:", tD)
        //this.setState({
          //  totalDifference: tD
        //})
        //update global state
    }

    componentDidMount(){
        console.log('NewTemplateForm did mount');
        //console.log('state:', this.state)
        //create a initial form state in global store and send post fetch request
        //this.props.createTemplate(this.state);
        //this.props.createNewTemplateForm();
        //this.updateTem = setInterval( () => {
            console.log(this.props);
            //send fetch put/patch request
           // this.props.updateTemplate(this.props.template.data)
        //},
          //   30000)
           this.totEx = setInterval( () => {
            this.totalExpenditure();
          }, 3000)
    }

    componentWillUnmount(){
        //fetch request to find or create a template //or save button
       //clearInterval(this.updateTem)
       clearInterval(this.totEx)
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
                
                
                <br>
                </br>
                {
                //message
                }
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
