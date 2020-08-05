import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EditTemplate from './EditTemplate';
import fetchEditTemplate from '../actions/editTemplate/fetchEditTemplate'

class EditTemplateContainer extends React.Component {

    saveEdit = () => {
        let iD = this.props.match.params.id;
        this.props.fetchEditTemplate(iD);
    }

    render (){
        return (
            <div>
                <EditComponent />
            </div>
        )
    }
}

export default withRouter(connect(null, fetchEditTemplate)(EditTemplateContainer))