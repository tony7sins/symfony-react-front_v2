import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../form'
import { connect } from 'react-redux'
import { userConfirm } from '../actions'
// import history from '../history'

class ConfirmationForm extends Component {
    onSubmit = (values) => {
        return this.props.userConfirm(values.confirmationToken)
            .then(() => {
                this.props.reset()
                // history.push('/')
            })
    }
    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    <p className="card-text">Pls confirm your token! </p>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name='confirmationToken' label='Confirmation token:' type="text" component={renderField} />
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting}>
                            Confirm registration!
                        </button>

                    </form>
                </div>
            </div>
        )
    }
}

const FormWrapped = reduxForm({
    form: 'confirmationForm'
})(ConfirmationForm)

const mapDispatchToProps = {
    userConfirm
}

export default connect(null, mapDispatchToProps)(FormWrapped)