import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthMethods from '../../../Helpers/AuthMethods';
import EditRecipe from './EditRecipe';

class EditResponseForm extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthMethods();

        this.state = {
            recipes: [],
            isSubmitDisabled: false
        };
        let id = this.props.match.params.response_id;
        this.getResponse(id);
    }

    getResponse = (id) => {
        this.Auth.getResponse(id)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    recipes: res.data.recipes,
                });
            }).catch((err) => {
                this.props.history.push(`/responses/MyResponses`);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.Auth.editResponse(
            { id: this.props.match.params.response_id, recipes: this.state.recipes }
        ).then((res) => { this.props.history.push('/responses/MyResponses') });
    }

    handleRecipeChange = (value, name, index ) => {
        let recipes = this.state.recipes;
        recipes[index][name] = value;
        this.setState(recipes);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    {this.state.recipes.map((recipe, index) => (
                        <EditRecipe key={index} recipe={recipe} index={index} handleRecipeChange={this.handleRecipeChange}/>
                    ))}
                    <input type="submit" value="Edit response" className="btn btn-large btn-block btn-info" disabled={this.state.isSubmitDisabled} />
                    <input type="button" value="Cancel" onClick={() => { this.props.history.push('/responses/MyResponses') }} className="btn btn-large btn-block btn-danger" />
                </form>
            </div>
        );
    }
}

export default withRouter(EditResponseForm);