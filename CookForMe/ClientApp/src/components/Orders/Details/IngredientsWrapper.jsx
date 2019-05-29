import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Ingredient from './Ingredient'
export default class IngredientsWrapper extends Component {

    state = {
        ingredients: ['']
    }

    addNewIngredient = () => {
        //let ingredients = [...this.state.ingredients, ''];
        this.setState({ ingredients: [...this.state.ingredients, ''] });
        console.log(this.state.ingredients);
    }

    deleteIngredient = (index) => {
        let ingredients = this.state.ingredients;
        ingredients.splice(index, 1);
        this.setState(ingredients);
    }

    handleIngredientChange = (newValue, index) => {
        let ingredients = this.state.ingredients;
        ingredients[index] = newValue;

        this.setState(ingredients);
        console.log(this.state.ingredients);
    }

    saveIgredients = () => {
        let igredientsString = this.state.igredients.join(';');
        this.props.saveIngredients(igredientsString);
    }

    renderIngredients = () => {
       return this.state.ingredients.map((ingredient, index) => (
            <Ingredient ingredient={ingredient} index={index} key={index}
                deleteIngredient={this.deleteIngredient}
                handleIngredientChange={this.handleIngredientChange} />
        ))
    }

    render() {
        return (
            <div>
                <a className="button buttonAccept" onClick={this.addNewIngredient}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></a>
                <span>Ingredients amount: {this.state.ingredients.length}</span>
                {this.renderIngredients()}
            </div>
        );
    }
}