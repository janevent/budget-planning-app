import React from 'react';



const ClearForm = (props) => {
    
    return (
        <div className='ClearForm'><p className='high-light' onClick={props.clearForm}>Clear Form</p></div>
    )
    
}

export default ClearForm;