import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/auxiliary'

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed]
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open]

    }
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>

    )

}

export default sideDrawer