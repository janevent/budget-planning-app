import EditForm from'./EditForm';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import addNewExpense from '../actions/editBudget/addNewExpense';
import addNewIncome from '../actions/editBudget/addNewIncome';
import fetchEditBudget from '../actions/editBudget/fetchEditBudget';
import updateExpense from '../actions/editBudget/updateExpense';
import updateIncome from '../actions/editBudget/updateIncome';
import updateTitle from '../actions/editBudget/updateTitle';
import updateTotalDifference from '../actions/editBudget/updateTotalDifference';
import updateTotalExpenditure from '../actions/editBudget/updateTotalExpenditure';
import updateTotalIncomes from '../actions/editBudget/updateTotalIncomes';

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

