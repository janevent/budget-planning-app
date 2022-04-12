import React from 'react';

export default class IncomeInput extends React.Component {
    //debugg
    //constructor(){

    //}

    componentDidMount(){
        console.log('props:', this.props)
    }

    render(){
        return (
        
        <div className="IncomeInput">
        { this.props.income ?
        <div className="inputs">
            <label className="label">Description <input type="text" name="description" className="input" value={this.props.income.description} onChange={ (event) => this.props.handleIncomeChange(event, this.props.id)} onClick={this.props.handleIncomeMouseClick} placeholder="description" />
            </label>
            <label className="label">Amount $<input type="text" name="amount" className="input" value={this.props.income.amount} onChange={ (event) => this.props.handleIncomeChange(event, this.props.id)} placeholder="0" />
            </label>
            <br></br>
            </div>
            : " "
        }
        </div>
        
        )
    }
}

//export default IncomeInput;