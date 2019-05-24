import React, { Component } from 'react';
import AuthMethods from '../Helpers/AuthMethods';
import { withRouter } from 'react-router-dom';

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            deadline: this.props.orderToEdit.deadline,
            ingredientPhoto: this.props.orderToEdit.ingredientPhoto,
            ingredientsAvaiableList: this.props.orderToEdit.ingredientsAvaiableList,
            description: this.props.orderToEdit.description,
            isSubmitDisabled: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let {deadline, ingredientPhoto, ingredientsAvaiableList, description } = this.state;

        this.Auth.editOrder(
            {id: this.props.orderToEdit.orderId, deadline, ingredientPhoto, ingredientsAvaiableList, description }
        ).then((res) => { this.props.history.push('/residents')});
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.checkIfFormDataIsValid();
    }

    //checkIfFormDataIsValid = () => {
    //    if (this.state.userName.length > 0 && this.state.firstName.length > 0) {
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
                        {this.props.orderToEdit.id ? <h2 >Edit order</h2> : <h2 >Select order</h2>} 
                    </div>
                    <div className="form-row">
                        <div className="form-gorup col-md-8 offset-md-2">
                            <div className="form-group">
                                <label >Deadline</label>
                                <input className="form-control" type="text" name="deadline" value={this.state.deadline} onChange={this.handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Ingredient Photo</label>
                                <input className="form-control" type="text" name="ingredientPhoto" value={this.state.ingredientPhoto} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Ingredients Avaiable</label>
                                <input className="form-control" type="text" name="ingredientsAvaiableList" value={this.state.ingredientsAvaiableList} onChange={this.handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                            </div>

                            <input type="submit" value="Edit user data" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />

                            <input type="button" value="Cancel" onClick={() => { this.props.history.push('/orders') }} className="btn btn-large btn-block btn-danger" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditUserForm);