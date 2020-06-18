import React from 'react';
import { connect } from 'react-redux';
import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewTemplateForm from './NewTemplateForm';

class NewTemplateFormContainer extends React.Component {
    //create a reducer to create a template, and update

    createTemplateInStore = () => {
        let template = {
                     title: "untitled",
                     expenses: [{description: "", amount: "0"}],
                     incomes: [{description: "", amount: "0"}],
                     totalIncome: null,
                     totalExpenditure: null,
                     totalDifference: null
        };
        //dispatch an action type='create_template' action.template= template
        //fetchCreateTemplate(template)
    }

    fetchCreateTemplate = (template) => {
        fetch('http://localhost:3001/templates', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                template: template
            })
        })
        .then(response => response.json())
        .then(
            myjson => {
                console.log(myjson)
                //this.props.getTemplate(myjson);
            }
        )
    }

    updateTemplateInStore

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
            <NewTemplateForm user={this.props.user} createTemplate={this.createTemplate} updateTemplate={this.updateTemplate} template={this.props.template}/>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        template: state.template
    }
}

export default connect(mapStateToProps, { getTemplate })(NewTemplateFormContainer)