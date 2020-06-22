import React from 'react';
import { connect } from 'react-redux';

import ShowTemplate from 'showTemplate.js';
import setTemplate from '../showTemplate/setTemplate.js';

//when click new_form set newtemplate state to empty and show form
class ShowTemplateContainer extends React.Component {
    //fetch, which means I want the id in the stores template list X
    //set template to the data fetched
    //display on ShowTempalte
    fetchAndSetTemplate(id){
        fetch(`http://localhost:3001/templates/${id}`, {
            
        })
    }
} 

export default connect(null, { setTemplate })(ShowTemplateContainer)