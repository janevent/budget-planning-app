import React from 'react';
import '../index.css';
const Delete = (props) => {

    return (
        <div>
            <button name={props.item.id}  className='delete-button' className="bttn" onClick={props.deleteData} onMouseEnter={props.hoverDelete} >Delete</button>
            
        </div>
    )
}

export default Delete;