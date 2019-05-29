import React, { Component } from 'react';
import '../ComponentsStyles/Login.css';
import AuthMethods from '../Helpers/AuthMethods';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            userName: '',
            password: '',
            isSubmitDisabled: true
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let loginFormData = {
            userName: this.state.userName,
            password: this.state.password
        };

        this.Auth.login(loginFormData)
            .then(res => {
                if (res === false) {
                    return alert("Wrong login or password");
                }
                this.props.history.push('/profile');
            }).catch(err => {
                alert("Wrong login or password");
            })
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.checkIfFormDataIsValid();
    }

    checkIfFormDataIsValid = () => {
        if (this.state.userName.length > 0 && this.state.password.length > 0) {
            this.setState({ isSubmitDisabled: false });
        }
        else {
            this.setState({ isSubmitDisabled: true });
        }
    }

    render() {

        return (
            <div className="startForm">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label >User name</label>
                        <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                    </div>

                    <input type="submit" value="Log In" className="btn btn-large btn-block btn-success" disabled={this.state.isSubmitDisabled} />
                </form>
            </div>
        );
    }
}
