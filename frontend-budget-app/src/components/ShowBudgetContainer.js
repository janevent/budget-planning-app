import React from 'react';
import { connect } from 'react-redux';
import ShowPage from './ShowPage.js';

//import component to show budget

class ShowBudgetContainer extends React.Component {

    render(){
        let id = this.props.match.params.id;
        let budget = this.props.budgets.find( (b) => b.id === id);
        return (
            <div className='container'>                
                <ShowPage data={budget} />
            </div>
        )
    }
}

const mapStateToProps = ( { budgets }) => {
    return ({
        budgets
    })
}

export default connect(mapStateToProps)(ShowBudgetContainer)