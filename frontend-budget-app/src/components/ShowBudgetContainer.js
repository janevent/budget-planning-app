import React from 'react';
import { connect } from 'react-redux';
import ShowPage from './ShowPage.js';

//import component to show budget

class ShowBudgetContainer extends React.Component {

    render(){
        return (
            <div>
                <p>Hey! It's me the budget container.</p>
                <ShowPage data={this.props.budget} />
            </div>
        )
    }
}

const mapStateToProps = ( { budget }) => {
    return ({
        budget
    })
}

export default connect(mapStateToProps)(ShowBudgetContainer)