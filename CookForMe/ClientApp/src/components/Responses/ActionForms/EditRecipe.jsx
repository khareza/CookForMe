import React, { Component } from 'react';

export default class EditRecipe extends Component {
    handleInputChange = (event) => {
        let inputName = event.target.value;
        let inputValue = event.target.name;
        this.props.handleRecipeChange(inputName, inputValue, this.props.index);
        //this.checkIfFormDataIsValid();
    }

    render() {
        return (
            <div className="form-row">
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" value={this.props.recipe.name} onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" type="text" name="price" value={this.props.recipe.price} onChange={this.handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Avg Cook Time</label>
                    <input className="form-control" type="text" name="avgCookTime" value={this.props.recipe.avgCookTime} onChange={this.handleInputChange} />
                </div>
            </div>
        );
    }
}