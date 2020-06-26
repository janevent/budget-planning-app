import React from 'react';

const TitleForm = (props) => {
    return(
        <form className="new-item">
            <label className="title">Title <input type="text" name="title" value={props.title} onChange={(event) => props.handleTitleChange(event)}/>
            </label>
        </form>
    )
}

export default TitleForm