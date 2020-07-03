import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import setCurrentUser from './actions/user.js'

class User extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userName: "",
            password: "", 
            email: "",
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

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log("state:", this.state)
        fetch('http://localhost:3001/login', {
            credentials: "include",
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
                 Accept: 'application/json'
             },
            body: JSON.stringify( {
                user_name: this.state.userName,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(myjson => { 
            console.log("object:", myjson); 
            //dispatch action
            console.log("props:", this.props)
            this.props.setCurrentUser(myjson.data.attributes);
            this.props.history.push('/');
            //this.props.getBudgets
            //this.props.getTemplates
        }
        )
        .catch(error => console.log(error))
        //catch error
    }
    render(){
        return (
            <div className="center">
                <h1>Log In</h1>
                
                <form className="form" onSubmit= {this.handleOnSubmit} >
                    <label>
                        UserName <input type="text" name="username" value={this.state.userName} onChange={this.handleUserNameChange} />
                    </label>
                    
                    <label>
                        Password <input type="text" name="password" value={this.state.password}  onChange={this.handlePasswordChange} />
                    </label>
                    <br></br>
                    <input type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(setCurrentUser(user) )
    };
};

export default withRouter(connect(null, mapDispatchToProps)(User))