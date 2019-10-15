import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userRegisterComplete } from '../actions'
import RegisterForm from './RegisterForm'
import ConfirmationForm from './ConfirmationForm'
import history from '../history'


class RegisterFormContainer extends Component {
    // static propTypes = {

    // }
    state = {
        counter: 0,
    }

    componentDidMount() {
        this.setState({
            counter: 10
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const { confirmationSuccess, userRegisterComplete } = this.props

        if (prevProps.confirmationSuccess !== confirmationSuccess && confirmationSuccess) {
            this.timer = setInterval(
                () => {
                    this.setState(prevProps => ({ counter: (prevProps.counter - 1) }))
                }, 1000
            )
        }

        if (prevState.counter !== this.state.counter && this.state.counter <= 0) {
            userRegisterComplete()
            history.push('/')
        }
    }

    componentWillUnmount() {
        this.props.userRegisterComplete()

        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    render() {
        const { registrationSuccess, confirmationSuccess } = this.props
        if (!registrationSuccess) return <RegisterForm />
        if (!confirmationSuccess) return <ConfirmationForm />
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <h2>CONGRATS! U R REGISTERED</h2>
                    <p>U have registered. U will be redirected in {this.state.counter} seconds</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.registration
})

const mapDispatchToProps = ({
    userRegisterComplete
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer)