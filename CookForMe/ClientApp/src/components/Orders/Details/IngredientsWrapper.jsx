import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Ingredient from './Ingredient'

export default class IngredientsWrapper extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            ingredients: this.props.ingredientsList ? this.props.ingredientsList : ['']
        }
    }

    addNewIngredient = () => {
        //this.setState({ ingredients: this.props.getIngredients() });
        //let ingredients = [...this.state.ingredients, ''];
        this.setState({ ingredients: [...this.state.ingredients, ''] });
    }

    deleteIngredient = (index) => {

        let ingredients = this.state.ingredients;
        ingredients.splice(index, 1);
        this.setState(ingredients);
        this.saveIngredients();
    }

    handleIngredientChange = (newValue, index) => {
        let ingredients = this.state.ingredients;
        ingredients[index] = newValue;

        this.setState(ingredients);
        this.saveIngredients();
    }

    saveIngredients = () => {
        console.log('saveIngredients');
        let igredentsList = this.state.ingredients.filter((ingr) => {
            return ingr.match(/[a-z]/i);
        })
        let igredientsString = igredentsList.join(';');
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