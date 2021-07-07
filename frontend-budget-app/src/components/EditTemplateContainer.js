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

    handleTitleChange = (event) => {
        event.persist();
       let iD = this.props.match.params.id;
       this.props.editTemplateAndUpdateTitle(event.target.value, iD)
    }

    handleIncomeChange = (event, id) => {
        const { name, value } = event.target;
        let template = this.getTemplate();
        let income = template.incomes[id];
        console.log('template', template, 'income', income, 'id', id)
        
        let updatedAttributes = {...income.attributes, ...{[name]: value} };
        console.log('updatedAttributes:', updatedAttributes);
        let updatedIncome = {...income, ...{attributes: updatedAttributes}}
        //let updatedIncome = Object.assign( {}, income, {[name]: value})
        
        let templateId = this.props.match.params.id;
        this.props.editTemplateAndUpdateIncome(updatedIncome, id, templateId)
        this.totalIncomes();
        //update totals
    }

    handleExpenseChange = (event, expenseId) => {
        event.persist();
        const { name, value } = event.target;
        let template = this.getTemplate();
        let templateId = this.props.match.params.id;
        
        let expense = template.expenses[expenseId]
        let updatedAttributes = {...expense.attributes, ...{[name]:value}}
        let updatedExpense = {...expense, ...{ attributes: updatedAttributes} }
        //console.log('updatedExpense:', updatedExpense)
        this.props.editTemplateAndUpdateExpense(updatedExpense, expenseId, templateId);
        this.totalExpenses();
    }

    totalExpenses = () => {
        let expenses = this.getTemplate().expenses.map( (expense) => parseInt(expense.attributes.amount) )
        
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
        
        this.props.updateTotalIncomes(templateId, totalIncome)
    }
    addFunc = (total, number) => {
        return total + number
    }

    totalDifference = () => {
        let templateId = this.props.match.params.id
        let template = this.props.templates.find(t => t.id === templateId)
        console.log("template", template)
        let totalDif = template.total_income - template.total_expenditure;
        console.log("totalDif", totalDif)
        this.props.updateTotalDifference(templateId, totalDif)
        //action
    }

    saveEdit = () => {        
        let template = this.getTemplate();
        //temp as argument...
        console.log('reached SaveEdit')
        let filteredIncomes = template.incomes.filter( (t) => {
            return t.attributes.description !== ""
        });
        let filteredExpenses = template.expenses.filter( (t) => {
            return t.attributes.description !== ""
        });
        let copyIncomes = [...filteredIncomes];
        let copyExpenses = [...filteredExpenses];
        copyIncomes.forEach( (i) => i.attributes.id = i.id);
        //if i.id exists set id in attributes, else skip
        copyExpenses.forEach( (e) => e.attributes.id = e.id);
        let newIncomes = copyIncomes.map( (income) => income.attributes);
        let newExpenses = copyExpenses.map( (expense) => expense.attributes);
        let newTemplate = {
            title: template.title,
            total_income: template.total_income,
            total_expenditure: template.total_expenditure,
            total_difference: template.total_difference,
            expenses_attributes: newExpenses,
            incomes_attributes: newIncomes,
            id: template.id
        }
        console.log('template', template, 'newTemplate', newTemplate);
        this.props.fetchEditTemplate(newTemplate, template.id);
        this.props.history.push(`/templates/${template.id}`)
    }

    getTemplate = () => {
        let iD = this.props.match.params.id;
        console.log('getTemplate:', this.props.templates)
        //why stored as an object instead of an array?
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
        
        this.setTotalExpenses = setInterval( () => { this.totalExpenses() }, 1000 )
        this.setTotalIncomes = setInterval( () => { this.totalIncomes()}, 1000)

        this.setTotalDifference = setInterval( () => { this.totalDifference()}, 1000)

        let templateId = this.props.match.params.id;
        setTimeout(() => {
            this.props.addNewIncome(templateId)
          }, 5000)
        setTimeout(() => {
            this.props.addNewExpense(templateId)
        }, 5000)
    }
    componentWillUnmount(){
        clearInterval(this.setTotalExpenses)
        clearInterval(this.setTotalIncomes)
        clearInterval(this.setTotalDifference)
    }

    render (){
        return (
            <div className='edit-container'>
                <div>

                </div>
                { this.props.templates.length  !== 0?
                    <EditForm saveEdit={this.saveEdit} data={this.getTemplate()} handleTitleChange={this.handleTitleChange} type={'Template'}  handleIncomeChange={this.handleIncomeChange} handleExpenseChange={this.handleExpenseChange} onClickAddIncome={this.onClickAddIncome} onClickAddExpense={this.onClickAddExpense} saveEdit={this.saveEdit}/>
                : "" 
                }
                
            </div>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }
}

export default withRouter(connect(mapStateToProps, { fetchEditTemplate, fetchCurrentUser, editTemplateAndUpdateTitle, editTemplateAndUpdateIncome, editTemplateAndUpdateExpense, updateTotalExpenditure, updateTotalDifference, updateTotalIncomes, addNewIncome, addNewExpense})(EditTemplateContainer))