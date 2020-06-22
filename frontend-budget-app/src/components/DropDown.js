import React from 'react';

class DropDown extends React.Component {
    render(){
        //console.log("props:", this.props.items)
        
        //debugger
        return (
        <div className="wrapper">
            <div className="header-title">{this.props.title}</div>
             
            <ul className="list">
                { this.props.items.map( (i) => {
                    return <li className="list-item" key={i.id}>{i.attributes.title}</li>
                    })
                }
            </ul>
        </div>
           // <li className="list-item" key={this.props.key}>{this.//props.item.title}</li>
        )
    }
}

export default DropDown