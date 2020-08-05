import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditForm from './EditForm';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'

class EditTemplateContainer extends React.Component {

    saveEdit = (template) => {
        let iD = this.props.match.params.id;
        this.props.fetchEditTemplate(iD, template);
    }

    getTemplate = () => {
        let template = this.props.templates.find( (template) => template.id === iD )
        return template
    }

    render (){
       let template = getTemplate();
        return (
            <div>
                <h2>Edit Template Below</h2>
                <EditForm saveEdit={this.saveEdit} data={template} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }
}

export default withRouter(connect(mapStateToProps, { fetchEditTemplate })(EditTemplateContainer))