import React from 'react';
//import edit button/ or link
import { connect } from 'react-redux';

class ShowTemplate extends React.Component {

    render(){
        let listExpenses = "";
        let listIncomes = "";
        if(this.props.template && this.props.template.expenses){
            listExpenses = this.props.template.expenses.map( (expense) => {
                return <p>{expense.attributes.description} : {expense.attributes.amount}</p>
            })
        }
        if(this.props.template && this.props.template.incomes){
            listIncomes = this.props.template.incomes.map( (income) => {
                return <p>{income.attributes.description} : {income.attributes.amount} </p>
            })
        }
        return (
            <div>
                { this.props.template ?
                    <div>
                        <h2>{this.props.template.title}</h2>
                        <h3>Expenses</h3>
                        <div>{listExpenses}</div>
                        <h3>Total Expenditure: {this.props.template.total_expenditure} </h3>
                        <h3>Incomes</h3>
                        <div>{listIncomes}</div>
                        <h3>Total Income: {this.props.template.total_income}</h3>
                        <h3>Total Difference: {this.props.template.total_difference}</h3>
                    </div>
                :
                "" }
            </div>
        )

    }


}

const mapStateToProps = (state) => {
    return {
        template: state.template
    }
}

export default connect(mapStateToProps)(ShowTemplate)
//why this in render works even though it is not binding this or an arrow function

