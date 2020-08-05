import React from 'react';

export default class Button extends React.Component {

    state = {
        number: 0
    }

    handleClick = () => {
        this.setState( {
            number : this.state.number + 1
        })
        console.log('state:', this.state)
    }

    render(){
        return (
        <button onClick={this.handleClick}>{this.state.number}</button>
        )
    }
}