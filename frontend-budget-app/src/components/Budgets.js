import React from 'react';
import { connect } from 'react-redux';
import Button from './Button.js';

class Budgets extends React.Component {

    

    render(){

        let budgets = this.props.budgets.map( (b) => {
            console.log('title:', b.title);
            return (
            <li key={b.id}>{b.title}: <Button/> </li>
            )
        }
        )
    

        return (
            <ul>
                {budgets}
            </ul>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        budgets: state.budgets
    }
}

export default connect(mapStateToProps)(Budgets);