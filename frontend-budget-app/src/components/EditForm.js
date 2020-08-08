import React from 'react';

export default class EditForm extends React.Component {

    constructor(props){
        super(props);
        console.log('edit form constructor:', this.props.data)
        this.state = {
            data: this.props.data
        }
    }

    componentDidMount(){
        console.log('edit form from componenetDidMount:', this.props)
    }
    render(){
        return(
            <div className='EditForm'>
                <p>This is an EditForm</p>
                <form>
                    <label>Title: <input name='title' value={this.state.data.title} />
                    </label>
                </form>
            </div>
        )
    }
}