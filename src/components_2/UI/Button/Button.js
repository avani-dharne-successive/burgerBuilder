import React from 'react'
import classes from './Button.css'

const button = (props) => {

    return (

        <button className={[classes.Button, classes[props.btnType]].join(' ')} onClick={props.clicked}>{props.children}</button>

    )

}

//What we need to pass to the clssname is a string . We can also array of strings

export default button