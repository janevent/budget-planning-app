import React from 'react';

export default class SaveNew extends React.Component {
    
    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.save()
    }
    render(){
        return (
            <form onSubmit={this.handleOnSubmit} >
                <input className="bttn" type="submit" name="save" value="Save"/>
            </form>
        )
    }
}