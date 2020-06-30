import React from 'react';
import { connect } from 'react-redux';
import addTemplateData from '../actions/newBudget/addTemplateData.js';

class UploadDropDown extends React.Component {

    fetchTemplate = (id) => {
        fetch(`http://localhost:3001/templates/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then( resp => resp.json())
        .then(templateData => {
            if(templateData.error){
                alert(templateData.error)
            }else {
                console.log('templateData:', templateData)
                let tem = templateData.data.attributes;
                //tem.id = templateData.data.id;
                console.log("tem:", tem);
                let expenses = templateData.included.filter((item) => item.type === "expense");
                let incomes = templateData.included.filter( (item) => item.type === "income" );
                let e = expenses.map((e) => e.attributes)
                let i = incomes.map((i) => i.attributes)
                console.log("e:", e);
                console.log("i:", i)
                console.log('addTemplateData', this.props.addTemplateData)
                this.props.addTemplateData(tem, e, i)
            }
        })
        .catch(console.log)
    }

    
    render(){
        return (
            <div className="wrapper transfer">
                <div className="header-title">Transfer a Template To This Page</div>
                <ul className="list">
                    {this.props.templates.map( (t) => {
                        return (
                        <li className="list-item" key={t.id} onClick={(e) => this.fetchTemplate(t.id)}>{t.attributes.title}</li>
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

export default connect(mapStateToProps, { addTemplateData })(UploadDropDown)