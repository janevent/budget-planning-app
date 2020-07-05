import React from 'react';

const Delete = (props) => {

    return (
        <div>
            <button name={props.item.id}  className='delete-button' onClick={props.deleteData} onMouseEnter={props.hoverDelete} >Delete</button>
            
        </div>
    )
}

export default Delete;