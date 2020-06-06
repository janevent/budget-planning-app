import React from 'react';

export default class User extends React.Component {

    constructor(props){
        super(props)
        state = {
            username: "",
            password: "", 
            email: "",
        }
    }
    render(){
        return (
            <div>
                <form onSubmit= {this.handleOnSubmit} >
                    <label>
                        UserName
                        <input type="text" />

                    </label>
                    <label>
                        Password
                        <input type="text"/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}