import React from 'react';

class DropDown extends React.Component {
    render(){
        return (
        <div className="wrapper">
            <div className="header-title">{this.props.title}</div>
            <ul className="list">
                {this.props.items.map( (temp) => {
                    return <li className="list-item">{temp.title}</li>
                    }
                )}
            </ul>
        </div>
        )
    }
}

export default DropDown