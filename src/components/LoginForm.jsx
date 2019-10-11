import React from 'react'
// import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../form'
import { connect } from 'react-redux'
import { userLoginAttapmt } from '../actions'
// import { bindActionCreators } from "redux"


const LoginForm = (props) => {

    const { handleSubmit, submitting, error } = props
    // 

    // useEffect(() => {
    //     // const { error } = props
    //     console.log(props);

    // }, [props])

    const onSubmit = (values) => {
        // console.log(values)
        return props.userLoginAttapmt(values.username, values.password)
    }
    return (
        <div className="text-center">
            <form action="" className="mt-4 text-center" onSubmit={handleSubmit(onSubmit)}>
                <Field name='username' label='Username' type='text' component={renderField} />
                <Field name='password' label='Password' type='password' component={renderField} />
                <button type="submit" disabled={submitting} className="btn btn-primary btn-big btn-block">Log in!</button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
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

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     userLoginAttapmt
// }, dispatch)


export default connect(null, mapDispatchToProps)(formWrapped)