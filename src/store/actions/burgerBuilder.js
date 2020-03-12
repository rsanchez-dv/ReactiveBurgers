import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name       
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name       
    };
};

export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientsFailed = () =>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () =>{
    // Possible because of Thunk we can execute async code
    return dispatch => {
        axios.get('https://burgerbuilder-49a24.firebaseio.com/ingredients.json')
        .then(response =>{
            // this.setState({ingredients: response.data});
            // call a dispatch
            dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            // this.setState({error: true})
            // call a dispatch
            dispatch(fetchIngredientsFailed());
        })
    }
};