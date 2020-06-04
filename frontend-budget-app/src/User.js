import React from 'react';

export default class User extends React.Component {
    createUser = () => {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
            user: {
            username: "suse",
            password: "greeneggs",
            email: "geah@email.com"
            }
        })
    })
    .then(r => r.json())
    .then(console.log)
    }

    componentDidMount(){
        this.createUser();
    }

    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <form>
                    <label name="username">
                        <input type="text" />
                    </label>
                    <label name="password">
                        <input type="text" />
                    </label>
                    <label name="email">
                        <input type="text" />
                    </label>

                </form>
            </div>
        )
        
    }
}