import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import fetchNewCurrentUser from './actions/newUser.js';

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
        
        let user = {
            username: this.state.userName,
            password: this.state.password,
            email: this.state.email
        }
        this.props.fetchNewCurrentUser({user: user})
        this.props.history.push('/');
        
    }

    render() {
        return (
            <div className="center">
                <h1>Sign Up</h1>
                <form className="form" onSubmit={this.handleOnSubmit} >
                    <label>
                        UserName <input type="text" className="input" name="username" onChange={this.handleUserNameChange} value={this.state.userName} />
                    </label>
                    
                    <label>
                        Password <input type="password" className="input" name="password" value= {this.state.password} onChange={this.handlePasswordChange}/>
                    </label>
                    
                    <label>
                        Email <input type="email" name="email" className="input" value= {this.state.email} onChange={this.handleEmailChange}/>
                    </label>
                    <br></br>
                    <input type="submit" className="bttn signup" value="Sign Up" />
                </form>
            </div>
        )       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNewCurrentUser: (user) => dispatch(fetchNewCurrentUser(user) )
    };
};


export default withRouter(connect(null, mapDispatchToProps)(NewUser));