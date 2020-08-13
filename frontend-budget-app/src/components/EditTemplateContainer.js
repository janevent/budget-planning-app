import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'
import updateTitle from '../actions/editTemplate/updateTitle';
import updateIncome from '../actions/editTemplate/updateIncome';


//possibility: create a local state for the template and dispatch 'EDIT_TEMPLATE' action when submitted.
class EditTemplateContainer extends React.Component {

    constructor(props){
        super(props)
        console.log('edittemplate container constructor:', props)
        this.state = {
            template: ''
        }
        console.log('state:', this.state)
        //can not access props quick enough
    }
//edit directly in templates or create an editTemplate reducer ?
    handleTitleChange = (event) => {
        console.log('handleTitleChange is triggered')
        console.log('state:', this.state)
       // this.props.updateTitle(event.value)
    }

    handleIncomeChange = (event, id) => {
        const { name, value } = event.target;
        let template = this.getTemplate();
        let income = template.incomes.find( income => income.id === id);
        let updatedIncome = Object.assign( {}, income, {[name]: value})
        this.props.updateIncome(updatedIncome, id)
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

    componentDidMount(){
        console.log('componentDidMount templates:', this.props.templates) 
    }

    render (){
        
       console.log('this is EditTemplateContainer:', this.props.templates);
        let id = this.props.match.params.id;
        //let template = this.props.templates.find( (t) => t.id === id);
        return (
            <div className='edit-container'>
                
                <EditForm saveEdit={this.saveEdit} data={this.getTemplate()} handleTitleChange={this.handleTitleChange} type={'Template'}  handleIncomeChange={this.handleIncomeChange} />
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

export default withRouter(connect(mapStateToProps, { fetchEditTemplate, updateTitle, updateIncome })(EditTemplateContainer))