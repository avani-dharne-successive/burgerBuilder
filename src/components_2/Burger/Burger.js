import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients.js'

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    console.log(transformedIngredients)
    transformedIngredients = transformedIngredients.map(iKey => [...new Array(props.ingredients[iKey])].map((_, i) => {
        return <BurgerIngredient key={iKey + i} type={iKey}></BurgerIngredient>

    })).reduce((acc, el) => {

        return acc.concat(el)

    }, [])



    console.log(transformedIngredients)

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add elements!!</p>

    }


    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>

        </div>



    )

}

export default burger