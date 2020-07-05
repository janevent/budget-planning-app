import React from 'react';
import { connect } from 'react-redux';
//import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewTemplateForm from './NewTemplateForm.js';
import ClearForm from './ClearForm.js';
import { withRouter } from 'react-router';

import createNewTemplate from '../actions/newTemplate/createNewTemplate.js';
import setNewTemplateID from '../actions/newTemplate/setNewTemplateID.js';
import clearNewTemplate from '../actions/newTemplate/clearNewTemplate.js';
import addTemplate from '../actions/templates/addTemplate.js';


class NewTemplateFormContainer extends React.Component {
    //create a reducer to create a template, and update
    createNewTemplateForm = () => {
        let template = {
                     title: "untitled",
                     expenses: [{description: "", amount: "0"}],
                     incomes: [{description: "", amount: "0"}],
                     totalIncome: null,
                     totalExpenditure: null,
                     totalDifference: null
        };
        console.log('props:', this.props)
        this.props.createNewTemplate(template)
        //dispatch an action type='create_template' action.template= template
        //this.fetchCreateTemplate(template) //don't need to save it on the backend yet
    }

    save = () => {
        console.log(this.props.newTemplate)
        let template = this.props.newTemplate;
        let expenses = template.expenses.filter( (e) => e.description!== "")
        let incomes = template.incomes.filter( (i) => i.description!== "");
        fetch('http://localhost:3001/templates', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                template: {
                    title: template.title,
                    total_income: template.totalIncome,
                    total_expenditure: template.totalExpenditure,
                    total_difference: template.totalDifference,
                    expenses_attributes: expenses,
                    incomes_attributes: incomes
                }
            })
        })
        .then(response => response.json())
        .then(
            myjson => {
                console.log("mytemplatejson:", myjson)
                //let nT = myjson.data.attributes;
                //nT.expenses = [];
                //myjson.data.include
                //nT.id = myjson.data.id;
                //set New Template to json.data.attributes
                this.props.addTemplate(myjson)
                this.props.setNewTemplateID(myjson.data.id)
                //withRouter
                this.props.history.push('/');
            }
        )
    }

    //updateTemplateInStore

    updateTemplate = (template) => {
        console.log(template.id)
        fetch(`http://localhost:3001/templates/${template.id}`,{
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                template: {
                    title: template.attributes.title,
                    total_income: template.attributes.totalIncome,
                    total_expenditure: template.attributes.totalExpenditure,
                    total_difference: template.attributes.totalDifference,
                    expenses: template.relationships.expenses.data,
                    incomes: template.relationships.incomes.data
                }
            })
        }) 
        //params.require(:template).permit(:title, :total_income, :total_expenditure, :total_difference, expenses: [], incomes: []) relationships.expenses.data, id, attributes
        .then(response => response.json())
        .then(
            myjson => {
                console.log(myjson)
                //this.props.getTemplate(myjson);
            }
            //set store- dispatch action settemplate
         )
    }

    render(){
        return (
            <div className='container'>
                <div className='to-the-left'>
                    <ClearForm clearForm={this.props.clearNewTemplate}/>
                </div>
                <NewTemplateForm user={this.props.user} createTemplate={this.createNewTemplateForm} updateNewTemplate={this.updateTemplate} template={this.props.newTemplate} save={this.save} />
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

export default withRouter(connect(mapStateToProps, {  createNewTemplate, setNewTemplateID, clearNewTemplate, addTemplate })(NewTemplateFormContainer));