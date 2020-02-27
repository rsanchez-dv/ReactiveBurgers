import * as actionTypes from '../actions/actionsTypes';
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

const reducer = (state = initialState,action) =>{
    // What type of action are we doing?
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            // Run Add Ingredient and update the global store
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] -  1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                // The following one line is all you need to set the ingredients to the app however
                // the order will be from the database not the order that we wanted
                // ingredients: action.ingredients,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                // You could pull this from server but for now its hard coded
                totalPrice: 4,
                error: false
            }
         case actionTypes.FETCH_INGREDIENTS_FAILED:
             return {
                 ...state,
                 error: true
             }
        default: return state;
    }
}
export default reducer;