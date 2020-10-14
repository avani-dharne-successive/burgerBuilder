import React from 'react'

import Auxiliary from '../../../hoc/auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const summaryIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey} : {props.ingredients[igKey]}</span></li>
        })
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {summaryIngredients}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType='Success' clicked={props.continue}>CHECKOUT</Button>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>


        </Auxiliary>

    )
}

export default orderSummary