import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ShowPage from './ShowPage.js';

import fetchDeleteTemplate from '../actions/templates/removeTemplate.js';
//import setTemplate from '../showTemplate/setTemplate.js';

//when click new_form set newtemplate state to empty and show form
class ShowTemplateContainer extends React.Component {

    deleteData = (event) => {
        this.props.fetchDeleteTemplate(this.props.match.params.id);
        this.props.history.push('/')
    }

    hoverDelete = () => {
        //let e = document.getElementById("delete-warning");
        //e.classList.remove("hidden");
        
        console.log('hoverDelete method is triggered')
        
    }

    
    render(){
        let id = this.props.match.params.id;
        let template = this.props.templates.find((t) => t.id === id)
        let editLink = `/templates/edit/${id}`;
        return (
            <div className='show-container'>                
                <ShowPage data={template} deleteData={this.deleteData} editLink={editLink} hoverDelete={this.hoverDelete} />
               
            </div>
        )
    }

} 

//export default connect(null, { setTemplate })(ShowTemplateContainer)
const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }
}

export default withRouter(connect(mapStateToProps, { fetchDeleteTemplate })(ShowTemplateContainer))