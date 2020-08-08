import React from 'react';

const EditForm = ( { data })  => {

    
    
        return(
            
            <div className='EditForm'>
                { data ?
                    <div className='edit-form-wrapper' >
                        <p>This is an EditForm</p>
                        <form>
                            <label>Title: <input name='title' value={data.title} />
                            </label>
                        </form>
                    </div>
                :
                "" }
            </div>   
        )
}

export default EditForm