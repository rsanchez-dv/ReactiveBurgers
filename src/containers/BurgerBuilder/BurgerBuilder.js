import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
// You need to connect this component with Redux
import {connect} from 'react-redux';
// What actions you can do with Redux
import * as burgerBuilderActions from '../../store/actions/';
// Brings in our Axios instance
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-orders';



class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        
    }
    componentDidMount () {
        console.log(this.props)
        // We need asyncronous Redux for this to work
        this.props.onInitIngredients();
    }

    purchaseHandler = () =>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum,el) =>{
            return sum +el;
        },0);
        return sum > 0;
    }

    purchaseContinueHandler = () =>{
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p>: <Spinner/>

        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        // Pass the dispatch functions as props
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemove = {this.props.onIngredientRemove}
                        price = {this.props.price}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        purchaseable = {this.updatePurchaseState(this.props.ings)}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                price={this.props.price}
                                purchaseCanceled={this.purchaseCancelHandler} 
                                purchaseContinue={this.purchaseContinueHandler}/>
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
// Utilizing Redux in the project
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    };
}
// Creating dispatches for Redux to be used in the code see line: 73
const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));