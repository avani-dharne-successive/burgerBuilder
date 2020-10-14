import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null
                })

                return request
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {

                this.setState({
                    error: error
                })


            })

        }


        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)

        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }


        render() {
            return (
                <Auxiliary>
                    <Modal show={this.state.error !== null} modalClosed={this.errorConfirmedHandler} >
                        Something didnt work!
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )

        }
    }
}

export default withErrorHandler