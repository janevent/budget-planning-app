import React from 'react';
import './index.css';

export default class NewUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            email: ""
        }

    }

    // createUser = () => {
    //     fetch('http://localhost:3001/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify({
    //         user: {
    //         username: "suse",
    //         password: "greeneggs",
    //         email: "geah@email.com"
    //         }
    //     })
    // })
    // .then(r => r.json())
    // .then(console.log)
    // }

    // componentDidMount(){
    //     this.createUser();
    // }

    handleUserNameChange = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log("state:", this.state)
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
            user: {
            username: this.state.userName,
            password: this.state.password,
            email: this.state.email
            }
            })
        })
        .then(r => r.json())
        .then((myjson) => console.log("user:", myjson ))
    }

    render() {
        return (
            <div className="center">
                <h1>Sign Up</h1>
                <form className="sign-up-form" onSubmit={this.handleOnSubmit} >
                    <label>
                        UserName <input type="text" name="username" onChange={this.handleUserNameChange} value={this.state.userName} />
                    </label>
                    <br></br>
                    <label>
                        Password <input type="text" name="password" value= {this.state.password} onChange={this.handlePasswordChange}/>
                    </label>
                    <br></br>
                    <label>
                        Email <input type="text" name="email" value= {this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br></br>
                    <input type="submit" value="SignUp" />
                </form>
            </div>
        )
        
    }
}