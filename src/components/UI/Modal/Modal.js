import React, { Component } from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextStae) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children

    }

    componentWillUpdate() {

        console.log('[Modal] componentWillUpdate')

    }

    render() {

        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )

    }

}
export default Modal;