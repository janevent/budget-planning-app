import React from 'react';
import { 
    Link } from 'react-router-dom';

const EditButton = (props) => {        
    return (
        <button className="bttn"><Link className="no-underline" to={props.editLink}>Edit</Link></button>
    )    
}

export default EditButton;