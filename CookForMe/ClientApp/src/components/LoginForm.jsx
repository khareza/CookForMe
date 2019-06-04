import React, { Component } from 'react';
import '../ComponentsStyles/Login.css';
import AuthMethods from '../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';
import { Error } from './Error';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();
        this.state = {
            userName: '',
            password: '',
            isSubmitDisabled: true,
            errors: {}
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
                NotificationManager.success('Login Successful', 'Correct');
                this.props.history.push('/profile');
            }).catch(err => {
                NotificationManager.error('Wrong login or password', 'Error!')
                this.handleInputErrors(err.response.data.errors);
            })
    }

    handleInputErrors = (errors) => {
        let errorsArray = [];
        for (var field in errors) {
            errorsArray[field] = errors[field];
        }
        this.setState({ errors: errorsArray });
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
                        <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
                        {this.state.errors['UserName'] ? <Error messages={this.state.errors['UserName']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        {this.state.errors['Password'] ? <Error messages={this.state.errors['Password']} /> : null}
                    </div>

                    <input type="submit" value="Log In" className="btn btn-large btn-block btn-success" disabled={this.state.isSubmitDisabled} />
                </form>
            </div>
        );
    }
}
