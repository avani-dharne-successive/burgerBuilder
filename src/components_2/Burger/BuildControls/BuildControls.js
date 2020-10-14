import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {

    console.log(props.purchasable)

    return (
        <div className={classes.BuildControls}>
            <p>Total Price : <strong>{props.price}</strong></p>
            {controls.map(c => {
                return <BuildControl
                    key={c.label}
                    label={c.label}
                    added={() => props.ingredientAdded(c.type)}
                    removed={() => props.ingredientRemoved(c.type)}
                    disabled={props.disabled[c.type]}
                >

                </BuildControl>
            })}
            <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >ORDER NOW!!</button>


        </div>


    )

}

export default buildControls