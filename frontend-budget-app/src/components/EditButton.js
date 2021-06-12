import React from 'react';
import { 
    Link } from 'react-router-dom';

const EditButton = (props) => {        
    return (
        <Link to={props.editLink}>Edit</Link>
    )    
}

export default EditButton;