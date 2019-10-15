import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { blogPostAdd } from '../actions'
import { canWriteBlogPosts } from '../api/apiUtils'
import { Redirect } from 'react-router'
import { renderField } from '../form'
import history from '../history'

class BlogPostForm extends Component {
    static propTypes = {
        userData: PropTypes.object,
        blogPostAdd: PropTypes.func
    }
    static defaultProps = {
        userData: {},
        blogPostAdd: () => { }
    }

    onSubmit = ({ title, content }) => {
        const { blogPostAdd, reset } = this.props
        return blogPostAdd(title, content)
            .then(() => {
                reset()
                history.push('/')
            })
    }

    render() {
        const { userData, handleSubmit, submitting, pristine, error } = this.props

        if (!canWriteBlogPosts(userData)) {
            return <Redirect to="login" />
        }
        return (
            <div className="card mt-3 mb-3 shadow-sm">
                <div className="card-boy">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name="title" label="Title:" type="text" component={renderField} />
                        <Field name="content" label="Content:" type="textarea" component={renderField} />

                        <button
                            type="submit"
                            className="btn btn-primary btn-big btn-block"
                            disabled={submitting || pristine} >
                            Submit
                        </button>
                    </form>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        )
    }
}

const WrappedForm = reduxForm({
    form: 'blogPostForm'
})(BlogPostForm)

const mapStateToProps = state => {
    // console.log(state.auth.userData)
    return {
        userData: state.auth.userData
    }
}

const mapDispatchToProps = ({
    blogPostAdd
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm)