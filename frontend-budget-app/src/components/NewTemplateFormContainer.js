import React from 'react';
import { connect } from 'react-redux';
import NewTemplateForm from './NewTemplateForm';

class NewTemplateFormContainer extends React.Component {

    render(){
        return (
            <NewTemplateForm user={this.props.user} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NewTemplateFormContainer)