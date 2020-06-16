import React from 'react';
import { connect } from 'react-redux';
import getTemplate from '../actions/getTemplate';
//import getBudget from '../actions/getBudget';
import NewTemplateForm from './NewTemplateForm';

class NewTemplateFormContainer extends React.Component {

    createTemplate = (template) => {
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
                this.props.getTemplate(myjson);
            }
        )
    }

    updateTemplate = (template) => {
        fetch(`http://localhost:3001/templates/${template.id}`,{
            credentials: 'include',
            method: 'PUT',
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
                this.props.getTemplate(myjson);
            }
            //set store- dispatch action settemplate
         )
    }

    render(){
        return (
            <NewTemplateForm user={this.props.user} createTemplate={this.createTemplate} updateTemplate={this.updateTemplate} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getTemplate })(NewTemplateFormContainer)