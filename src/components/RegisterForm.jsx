import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form"
import { renderField } from '../form'
import { userRegister } from '../actions'

class RegisterForm extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    state = {
        termsAccepted: false,
    }

    onTermsAcceptedClick = (e) => {
        this.setState(prevState => ({ termsAccepted: !prevState.termsAccepted }))

        // console.log(this.state)
    }

    onSubmit = (values) => {
        // console.log(...Object.values(values))
        return this.props.userRegister(...Object.values(values))
            .then(() => {
                this.props.reset()
            })
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name='username' label='Username:' type="text" component={renderField} />
                        <Field name='password' label='Password:' type="password" component={renderField} />
                        <Field name='retypedPassword' label='Re-typed pass:' type="password" component={renderField} />
                        <Field name='email' label='email' type="email" component={renderField} />
                        <Field name='name' label='Name:' type="text" component={renderField} />
                        <div className="form-check form-group">
                            <input className="form-check-input" type="checkbox" value={false} onClick={this.onTermsAcceptedClick} />
                            <label className="form-check-label">Default checkbox</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting || !this.state.termsAccepted}>
                            Register
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

const wrappedForm = reduxForm({
    form: 'registerForm'
})(RegisterForm)

const mapDippatchToProps = {
    userRegister
}

export default connect(null, mapDippatchToProps)(wrappedForm)
