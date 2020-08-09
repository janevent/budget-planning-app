import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'
import updateTitle from '../actions/editTemplate/updateTitle';


class EditTemplateContainer extends React.Component {

    constructor(props){
        super(props)
        console.log('edittemplate container constructor:', props)
    }
//edit directly in templates or create an editTemplate reducer ?
    handleTitleChange = (event) => {
        this.props.updateTitle(event.value)
    }

    saveEdit = (template) => {
        let iD = this.props.match.params.id;
        this.props.fetchEditTemplate(iD, template);
    }

    getTemplate = () => {
        let iD = this.props.match.params.id;
        let template = this.props.templates.find( (template) => template.id === iD )
        console.log('getTemplate:', this.props.templates)
        return template
    }

    componentDidMount(){
        console.log('componentDidMount templates:', this.props.templates) 
    }

    render (){
        
       console.log('this is EditTemplateContainer:', this.props.templates);
        let id = this.props.match.params.id;
        let template = this.props.templates.find( (t) => t.id === id);
        return (
            <div className='edit-container'>
                
                <EditForm saveEdit={this.saveEdit} data={template} handleTitleChange={this.handleTitleChange} type={'Template'} />
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

export default withRouter(connect(mapStateToProps, { fetchEditTemplate, updateTitle })(EditTemplateContainer))