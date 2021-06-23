import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ShowPage from './ShowPage.js';

import fetchDeleteBudget from '../actions/budgets/removeBudget.js';

//import component to show budget

class ShowBudgetContainer extends React.Component {

    deleteData = (event) => {
        console.log('props:', this.props);
        this.props.fetchDeleteBudget(this.props.match.params.id)
        this.props.history.push('/');
    }   

    hoverDelete = () => {
        console.log('hoverDelete method is triggered')
    }

    render(){
        let id = this.props.match.params.id;
        let budget = this.props.budgets.find( (b) => b.id === id);
        let editLink = `/budgets/edit/${id}`;
        return (
            <div className='show-container'>                
                <ShowPage data={budget} editLink={editLink} deleteData={this.deleteData} hoverDelete={this.hoverDelete}  />
            </div>
        )
    }
}

const mapStateToProps = ( { budgets }) => {
    return ({
        budgets
    })
}

export default withRouter(connect(mapStateToProps, { fetchDeleteBudget })(ShowBudgetContainer))