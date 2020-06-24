import React from 'react';
import { connect } from 'react-redux';

import ShowPage from './ShowPage.js';
//import setTemplate from '../showTemplate/setTemplate.js';

//when click new_form set newtemplate state to empty and show form
class ShowTemplateContainer extends React.Component {
    //fetch, which means I want the id in the stores template list X
    //set template to the data fetched
    //display on ShowTempalte
    // fetchAndSetTemplate(id){
    //     fetch(`http://localhost:3001/templates/${id}`, {
    //         credentials: 'include',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(myjson => {
    //         console.log(myjson);
    //         let template = myjson.data.attributes;
    //         template.id = myjson.data.id;
    //         let expenses = myjson.data.included.filter((item)  => item.type === 'expense');
    //         let incomes = myjson.data.included.filter((item) => item.type === 'expense')
    //         template.expenses = expenses;
    //         template.incomes = incomes;
    //         this.props.setTemplate(template)
    //     })
    // }

    render(){
        return (
            <div>
                <p>This is the ShowTemplateContainer</p>
                <ShowPage data={this.props.template} />
            </div>
        )
    }

} 

//export default connect(null, { setTemplate })(ShowTemplateContainer)
const mapStateToProps = (state) => {
    return {
        template: state.template
    }
}

export default connect(mapStateToProps)(ShowTemplateContainer)