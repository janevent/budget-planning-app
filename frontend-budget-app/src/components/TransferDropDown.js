import React from 'react';
import { connect } from 'react-redux';
import addTemplateData from '../actions/newBudget/addTemplateData.js';

class TransferDropDown extends React.Component {
    
    render(){
        return (
            <div className="wrapper transfer">
                <div className="header-title">Transfer a Template To This Page</div>
                <ul className="list">
                    {this.props.templates.map( (t) => {
                        return (
                        <li className="list-item high-light" key={t.id} onClick={(event) => this.props.addTemplateData(t)} >{t.title}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         templates: state.templates 
        }
}

export default connect(mapStateToProps, { addTemplateData })(TransferDropDown)

/* <li className="list-item" key={t.id} onClick={(e) => this.fetchTemplate(t.id)}>{t.title}</li> */