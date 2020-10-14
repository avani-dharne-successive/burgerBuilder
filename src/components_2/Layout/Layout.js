import React, { Component } from 'react'
import Auxiliary from '../../hoc/auxiliary';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false

        })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }

        })
    }



    render() {
        return (
            <Auxiliary>
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                     />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )

    }


}

export default Layout