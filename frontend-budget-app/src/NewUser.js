import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import newCurrentUser from './actions/newUser.js';

class NewUser extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            email: ""
        }
    }   

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
        console.log("props1:", this.props.newCurrentUser)
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
        .then((myjson) => {
            console.log("user:", myjson )
            console.log("props:", this.props.newCurrentUser)
            this.props.newCurrentUser(myjson.data.attributes)
        }
            )
    }

    render() {
        return (
            <div className="center">
                <h1>Sign Up</h1>
                <form className="form" onSubmit={this.handleOnSubmit} >
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
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        )       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newCurrentUser: (user) => dispatch(newCurrentUser(user) )
    };
};


export default connect(null, mapDispatchToProps)(NewUser)