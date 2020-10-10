import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'
import editTemplateAndUpdateTitle from '../actions/editTemplate/editTemplateAndUpdateTitle';
import editTemplateAndUpdateIncome from '../actions/editTemplate/editTemplateAndUpdateIncome';
import editTemplateAndUpdateExpense from '../actions/editTemplate/editTemplateAndUpdateExpense';
import updateTotalExpenditure from '../actions/editTemplate/updateTotalExpenditure';
import updateTotalIncomes from '../actions/editTemplate/updateTotalIncomes';
//possibility: create a local state for the template and dispatch 'EDIT_TEMPLATE' action when submitted.
import addNewIncome from '../actions/editTemplate/addNewIncome' 
import addNewExpense from '../actions/editTemplate/addNewExpense';
import updateTotalDifference from '../actions/editTemplate/updateTotalDifference';
//import editAddNewExpense
import fetchCurrentUser from '../actions/getCurrentUser';

class EditTemplateContainer extends React.Component {

    constructor(props){
        super(props)
        //console.log('edittemplate container constructor:', props)
        
        //can not access props quick enough
    }
//edit directly in templates or create an editTemplate reducer ?
    handleTitleChange = (event) => {
        //console.log('handleTitleChange is triggered')
        event.persist();
       let iD = this.props.match.params.id;
       this.props.editTemplateAndUpdateTitle(event.target.value, iD)
    }

    handleIncomeChange = (event, incomeId) => {
        const { name, value } = event.target;
        let template = this.getTemplate();
        let income = template.incomes.find( income => income.id === incomeId);
        let updatedAttributes = {...income.attributes, ...{[name]: value} };
        //console.log('updatedAttributes:', updatedAttributes);
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
        //console.log('updatedExpense:', updatedExpense)
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
            return parseInt(income.attributes.amount)
        });
        let totalIncome = incomes.reduce(this.addFunc, 0);
        let templateId = this.props.match.params.id;
        //console.log('updateTI', totalIncome)
        this.props.updateTotalIncomes(templateId, totalIncome)
    }
    addFunc = (total, number) => {
        return total + number
    }

    totalDifference = () => {
        let templateId = this.props.match.params.id
        let template = this.props.templates.find(t => t.id === templateId)
        let totalDif = parseInt(template.totalIncome) - parseInt(template.totalExpenditure);
        console.log("totalDif", totalDif)
        this.props.updateTotalDifference(templateId, totalDif)
        //action
    }

    saveEdit = () => {
        let iD = this.props.match.params.id;
        let template = this.props.templates.find((t) => t.id === iD)
        this.props.fetchEditTemplate(template, iD);
        this.props.history.push(`/templates/${iD}`)
    }

    getTemplate = () => {
        let iD = this.props.match.params.id;
        //console.log('getTemplate:', this.props.templates)
        let template = this.props.templates.find( (template) => template.id === iD )       
        return template
    }

    onClickAddExpense = () => {
        let templateId = this.props.match.params.id;
        this.props.addNewExpense(templateId);
    }

    onClickAddIncome = () => {
        let templateId = this.props.match.params.id;
        this.props.addNewIncome(templateId);
    }

    componentDidMount(){
        //console.log('componentDidMount templates:', this.props.templates) 
        this.setTotalExpenses = setInterval( () => { this.totalExpenses() }, 1000 )
        this.setTotalIncomes = setInterval( () => { this.totalIncomes()}, 1000)

        this.setTotalDifference = setInterval( () => { this.totalDifference()}, 5000)

        let templateId = this.props.match.params.id;
        //this.setTimeOut()
        setTimeout(() => {
            this.props.addNewIncome(templateId)
          }, 5000)
        setTimeout(() => {
            this.props.addNewExpense(templateId)
        }, 5000)
        //debugger
        //empty state found in reducer/ not updating
        //this.props.fetchCurrentUser();
        //this.props.addNewIncome(templateId);
        //this.props.addNewExpense(templateId);
    }
    componentWillUnmount(){
        clearInterval(this.setTotalExpenses)
        clearInterval(this.setTotalIncomes)
        clearInterval(this.setTotalDifference)
    }

    render (){
        
       //console.log('this is EditTemplateContainer:', this.props.templates);
       //this.props.fetchCurrentUser();
        let id = this.props.match.params.id;
        //let template = this.props.templates.find( (t) => t.id === id);
        return (
            <div className='edit-container'>
                { this.props.templates.length  !== 0?
                    <EditForm saveEdit={this.saveEdit} data={this.getTemplate()} handleTitleChange={this.handleTitleChange} type={'Template'}  handleIncomeChange={this.handleIncomeChange} handleExpenseChange={this.handleExpenseChange} onClickAddIncome={this.onClickAddIncome} onClickAddExpense={this.onClickAddExpense} saveEdit={this.saveEdit}/>
                : "" 
                }
                
            </div>
        )
        //use connect to retrieve templates in global state in EditForm instead
    }
}

const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }//addNewIncome addNewExpense
}

export default withRouter(connect(mapStateToProps, { fetchEditTemplate, fetchCurrentUser, editTemplateAndUpdateTitle, editTemplateAndUpdateIncome, editTemplateAndUpdateExpense, updateTotalExpenditure, updateTotalDifference, updateTotalIncomes, addNewIncome, addNewExpense})(EditTemplateContainer))