
import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Auxiliary from '../../hoc/auxiliary';

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 50,
    cheese: 30,
    bacon: 120,
    meat: 90
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,

        purchasable: false,
        purchasing: false,

        totalPrice: 100,
        loading: false
    }

    componentDidMount() {
        axios.get('https://react-burger-ee61a.firebaseio.com/ingredients.json').then(i => {

            console.log(i)
            this.setState({
                ingredients: i.data
            })

        }).catch(err => console.log(err))
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]

            }).reduce((sum, el) => {

                return sum + el;

            }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        let newPurchase = !this.state.purchasing
        this.setState({
            purchasing: newPurchase
        })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount

        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)



    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        let newCount = 0;

        if (oldCount > 0) {
            newCount = oldCount - 1;
        }


        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)


    }


    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        })
        let order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({
                loading: false,
                purchasing: false
            })

        }).catch(error => {
            this.setState({
                loading: false,
                purchasing: false
            })
        })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
       
        if (this.state.ingredients) {

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    >
                    </BuildControls>
                </Auxiliary>)
        }



        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>
        )
    }

}

export default withErrorHandler(BurgerBuilder, axios)