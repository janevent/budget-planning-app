import EditForm from'./EditForm';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

function EditBudgetContainer(props){

    return (
        <div className='edit-container'>
            <EditForm />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        budgets: state.budgets 
    }
}

export default withRouter(connect(mapStateToProps,)(EditBudgetContainer))

