import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ShowPage from './ShowPage.js';

import removeBudget from '../actions/budgets/removeBudget.js';

//import component to show budget

class ShowBudgetContainer extends React.Component {

    deleteData = (event) => {
        event.persist();
        // ?
        fetch( `http://localhost:3001/budgets/${this.props.match.params.id}`, {
            credentials: 'include',
            method: 'delete'           
        })
        .then( resp => resp.json())
        .then( myjson => {
            if(myjson.error){
                console.error(myjson.error)
            }else {
                console.log('myjson:', myjson)
                //remove from budgets in store
                //redirect to.. home
                this.props.removeBudget(this.props.match.params.id)
                this.props.history.push('/')
            }
        })
        .catch(console.log)

    }

   

    hoverDelete = () => {
        //alert("Only click this button if you want to permanently delete budget")
        let message = "Only click this button if you want to permanently delete budget";
        
        console.log('hoverDelete method is triggered')
    }

    render(){
        let id = this.props.match.params.id;
        let budget = this.props.budgets.find( (b) => b.id === id);
        return (
            <div className='show-container'>                
                <ShowPage data={budget} deleteData={this.deleteData} hoverDelete={this.hoverDelete}  />
            </div>
        )
    }
}

const mapStateToProps = ( { budgets }) => {
    return ({
        budgets
    })
}

export default withRouter(connect(mapStateToProps, { removeBudget })(ShowBudgetContainer))