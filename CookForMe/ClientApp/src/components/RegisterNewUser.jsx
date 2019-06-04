import React, { Component } from 'react';
import AuthMethods from '../Helpers/AuthMethods';
import { NotificationManager } from 'react-notifications';
import { Error } from './Error';

export class RegisterNewUser extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.state = {
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { userName, password, firstName, lastName, email } = this.state;

        this.Auth.register(
            { userName, password, firstName, lastName, email }
        ).then(() => {
            NotificationManager.success('Register Successful', 'Correct');
            this.props.history.push('/start/login');
        }).catch((err) => {
            console.log(err.response.data.errors);
            NotificationManager.error('Data not valid', "Error");
            this.handleInputErrors(err.response.data.errors);
        });
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
    }

    render() {
        return (
            <div className="startForm">
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-group">
                        <label >User Name</label>
                        <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
                        {this.state.errors['UserName'] ? <Error messages={this.state.errors['UserName']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        {this.state.errors['Password'] ? <Error messages={this.state.errors['Password']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>FirstName</label>
                        <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                        {this.state.errors['FirstName'] ? <Error messages={this.state.errors['FirstName']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>LastName</label>
                        <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                        {this.state.errors['LastName'] ? <Error messages={this.state.errors['LastName']} /> : null}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                        {this.state.errors['Email'] ? <Error messages={this.state.errors['Email']} /> : null}
                    </div>
                    <input type="submit" value="Register" className="btn btn-large btn-block btn-primary" />
                    <input type="button" value="Cancel" className="btn btn-large btn-block btn-danger"  onClick={() => { this.props.history.push('/start/login') }} />
                </form>
            </div>

        );
    }
}
