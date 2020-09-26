import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'
import editTemplateAndUpdateTitle from '../actions/editTemplate/editTemplateAndUpdateTitle';
import editTemplateAndUpdateIncome from '../actions/editTemplate/editTemplateAndUpdateIncome';
import editTemplateAndUpdateExpense from '../actions/editTemplate/editTemplateAndUpdateExpense';
import updateTotalExpenditure from '../actions/editTemplate/updateTotalExpenditure';
import updateTotalIncome from '../actions/editTemplate/updateTotalIncome';
//possibility: create a local state for the template and dispatch 'EDIT_TEMPLATE' action when submitted.
//import editAddNewIncome 
//import editAddNewExpense

class EditTemplateContainer extends React.Component {

    constructor(props){
        super(props)
        console.log('edittemplate container constructor:', props)
        
        //can not access props quick enough
    }
//edit directly in templates or create an editTemplate reducer ?
    handleTitleChange = (event) => {
        console.log('handleTitleChange is triggered')
        event.persist();
       let iD = this.props.match.params.id;
       this.props.editTemplateAndUpdateTitle(event.target.value, iD)
    }

    handleIncomeChange = (event, incomeId) => {
        const { name, value } = event.target;
        let template = this.getTemplate();
        let income = template.incomes.find( income => income.id === incomeId);
        let updatedAttributes = {...income.attributes, ...{[name]: value} };
        console.log('updatedAttributes:', updatedAttributes);
        let updatedIncome = {...income, ...{attributes: updatedAttributes}}
        //let updatedIncome = Object.assign( {}, income, {[name]: value})
        console.log('income:', income, 'updatedIncome:', updatedIncome)
        let templateId = this.props.match.params.id;
        this.props.editTemplateAndUpdateIncome(updatedIncome, incomeId, templateId)
        this.totalIncomes();
        //update totals
    }

    handleExpenseChange = (event, expenseId) => {
        //console.log('event:', event)
        //console.log('expenseId:', expenseId);
        event.persist();
        const { name, value } = event.target;
        let template = this.getTemplate();
        let templateId = this.props.match.params.id;
        const matchExpense = (expense) => expense.id === expenseId
        let expense = template.expenses.find( matchExpense );
        let updatedAttributes = {...expense.attributes, ...{[name]:value}}
        let updatedExpense = {...expense, ...{ attributes: updatedAttributes} }
        console.log('updatedExpense:', updatedExpense)
        this.props.editTemplateAndUpdateExpense(updatedExpense, expenseId, templateId);
        this.totalExpenses();
    }

    totalExpenses = () => {
        let expenses = this.getTemplate().expenses.map( (expense) => parseInt(expense.attributes.amount) )
        //console.log('totalExpenses:', expenses);
        let totalExpenses = expenses.reduce(this.addFunc, 0);
        let templateId = this.props.match.params.id;
        this.props.updateTotalExpenditure(templateId, totalExpenses);
    }

    totalIncomes = () => {
        let incomes = this.getTemplate().incomes.map( (income) => {
            return parseInt(expense.attributes.amount)
        });
        let totalIncome = incomes.reduce(this.addFunc, 0);
        let templateId = this.props.match.params.id;
        this.props.updateTotalIncomes(templateId, totalIncome)
    }
    addFunc = (total, number) => {
        return total + number
    }

    saveEdit = (template) => {
        let iD = this.props.match.params.id;
        this.props.fetchEditTemplate(iD, template);
    }

    getTemplate = () => {
        let iD = this.props.match.params.id;
        console.log('getTemplate:', this.props.templates)
        let template = this.props.templates.find( (template) => template.id === iD )
        
        return template
    }
    //handleExpenseClick = () => {
        //editAddNewExpense
    //}

    //handleIncomeClick = () => {
        //editAddNewIncome
        
    //}

    componentDidMount(){
        //console.log('componentDidMount templates:', this.props.templates) 
        this.setTotalExpenses = setInterval( () => { this.totalExpenses() }, 1000 )
    }
    componentWillUnmount(){
        clearInterval(this.setTotalExpenses)
    }

    render (){
        
       console.log('this is EditTemplateContainer:', this.props.templates);
        let id = this.props.match.params.id;
        //let template = this.props.templates.find( (t) => t.id === id);
        return (
            <div className='edit-container'>
                
                <EditForm saveEdit={this.saveEdit} data={this.getTemplate()} handleTitleChange={this.handleTitleChange} type={'Template'}  handleIncomeChange={this.handleIncomeChange} handleExpenseChange={this.handleExpenseChange}  />
                <p></p>
            </div>
        )
        //use connect to retrieve templates in global state in EditForm instead
    }
}

const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }
}

export default withRouter(connect(mapStateToProps, { fetchEditTemplate, editTemplateAndUpdateTitle, editTemplateAndUpdateIncome, editTemplateAndUpdateExpense, updateTotalExpenditure, updateTotalIncome})(EditTemplateContainer))