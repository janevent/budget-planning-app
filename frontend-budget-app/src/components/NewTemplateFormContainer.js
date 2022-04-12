import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewTemplateForm from './NewTemplateForm.js';
import ClearForm from './ClearForm.js';


//import createNewTemplate from '../actions/newTemplate/createNewTemplate.js';
import setNewTemplateID from '../actions/newTemplate/setNewTemplateID.js';
import clearNewTemplate from '../actions/newTemplate/clearNewTemplate.js';
import fetchAndAddTemplate from '../actions/templates/addTemplate.js';


class NewTemplateFormContainer extends React.Component {

    save = () => {
        console.log(this.props.newTemplate)
        let template = this.props.newTemplate;
        let expenses = template.expenses.filter( (e) => e.description!== "")
        let incomes = template.incomes.filter( (i) => i.description!== "");
        let title
        if(template.title){
            title = template.title
        }else{
            title = "untitled"
        }

        let newTemplate = {
            title: title,
            total_income: template.totalIncome,
            total_expenditure: template.totalExpenditure,
            total_difference: template.totalDifference,
            expenses_attributes: expenses,
            incomes_attributes: incomes
        }
        this.props.fetchAndAddTemplate(newTemplate)
        //go to home page
        this.props.history.push('/');
    }

    render(){
        return (
            <div className='container'>
                <div className='to-the-left'>
                    <ClearForm clearForm={this.props.clearNewTemplate}/>
                </div>
                <NewTemplateForm user={this.props.user} template={this.props.newTemplate} save={this.save} />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        newTemplate: state.newTemplate
    }
}

export default withRouter(connect(mapStateToProps, {   setNewTemplateID, clearNewTemplate, fetchAndAddTemplate })(NewTemplateFormContainer));