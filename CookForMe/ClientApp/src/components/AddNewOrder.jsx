import React, { Component } from 'react';
import AuthMethods from '../Helpers/AuthMethods';

export class RegisterNewOrder extends Component {
    constructor(props) {
        super(props);

        this.Auth = new AuthMethods();
        this.state = {
            founderId: '',
            deadline: '',
            ingredientPhoto: '',
            ingredientsAvaiableList: '',
            description: '',
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { founderId, deadline, ingredientPhoto, ingredientsAvaiableList, description } = this.state;

        this.Auth.register(
            { founderId, deadline, ingredientPhoto, ingredientsAvaiableList, description }
        );

        this.setState({
            founderId: '',
            deadline: '',
            ingredientPhoto: '',
            ingredientsAvaiableList: '',
            description: '',
            isSubmitDisabled: false
        });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
       // this.checkIfFormDataIsValid();
    }

    //checkIfFormDataIsValid = () => {
    //    if (this.state.userName.length > 0 && this.state.password.length > 0) {
    //        this.setState({ isSubmitDisabled: false });
    //    }
    //    else {
    //        this.setState({ isSubmitDisabled: true });
    //    }
    //}

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="headerLogin">
                        <h2 >Add new user</h2>
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >Founder ID</label>
                                <input className="form-control" type="text" name="founderId" value={this.state.founderId} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>deadline</label>
                                <input className="form-control" type="text" name="deadline" value={this.state.deadline} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <input className="form-control" type="text" name="ingredientPhoto" value={this.state.ingredientPhoto} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Ingredients Avaiable List</label>
                                <input className="form-control" type="text" name="ingredientsAvaiableList" value={this.state.ingredientsAvaiableList} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>
                            <input type="submit" value="Add new order" className="btn btn-large btn-block btn-primary" disabled={this.state.isSubmitDisabled} />
                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
