import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

// Global State
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};
// Store Ingredients for the app and to calculate the total cost
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient)

    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}
const removeIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients= updateObject(state.ingredients,updatedIngredient)

    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}
const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        // You could pull this from server but for now its hard coded
        totalPrice: 4,
        error: false
    });
}
const reducer = (state = initialState,action) =>{
    // What type of action are we doing?
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state,{error: true});
        default: return state;
    }
}
export default reducer;