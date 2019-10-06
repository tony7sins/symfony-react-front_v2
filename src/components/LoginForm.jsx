import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../form'
import { connect } from 'react-redux'
import { userLoginAttapmt } from '../actions'

const LoginForm = (props) => {
    // console.log(props)
    const onSubmit = ({ username, password }) => {
        props.userLoginAttapmt(username, password)
    }
    return (
        <div>
            <form action="" className="mt-4 text-center" onSubmit={props.handleSubmit(onSubmit)}>
                <Field name='username' label='Username' type='text' component={renderField} />
                <Field name='password' label='Password' type='password' component={renderField} />
                <button type="submit" className="btn btn-primary btn-big btn-block">Log in!</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    userLoginAttapmt: PropTypes.func,
}

LoginForm.defaultProps = {
    userLoginAttapmt: () => { },
}

const formWrapped = reduxForm({
    form: 'LoginForm'
})(LoginForm)

const mapDispatchToProps = {
    userLoginAttapmt
}

export default connect(null, mapDispatchToProps)(formWrapped)