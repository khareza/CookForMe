import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus} from '@fortawesome/free-solid-svg-icons'

export default class Ingredient extends Component {

    handleInputChange = (e) => {
        let newValue = e.target.value;
        let index = this.props.index;
        this.props.handleIngredientChange(newValue, index)
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.ingredient} onChange={this.handleInputChange}/>
                <a className="button buttonDelete" onClick={() => { this.props.deleteIngredient(this.props.index) }}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></a>
            </div>
        );
    }
}

