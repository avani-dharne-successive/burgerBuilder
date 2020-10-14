import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle'
import { ProgressPlugin } from 'webpack'

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggleSideDrawer} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />

            </nav>
        </header>

    )


}


export default toolbar