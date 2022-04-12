import React from 'react';

const TitleForm = (props) => {
    return(
        <form className="new-item">
            <label className="title">Title <input type="text" name="title" className="input" value={props.title} onChange={(event) => props.handleTitleChange(event)} placeholder="untitled"/>
            </label>
        </form>
    )
}

export default TitleForm