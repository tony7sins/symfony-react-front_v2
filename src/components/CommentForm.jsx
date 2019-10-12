import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentAdd } from '../actions'

import { Field, reduxForm } from 'redux-form'
import { renderField } from '../form'
// import { SubmissionError } from 'redux-form/lib/immutable'

class CommentForm extends Component {
    static propTypes = {
        children: PropTypes.func,
        blogPostId: PropTypes.func,
        commentAdd: PropTypes.func,
        reset: PropTypes.func,
        handleSubmit: PropTypes.func,
        pristine: PropTypes.func,
        submitting: PropTypes.func,
        error: PropTypes.func,
    }
    static propTypes = {
        children: () => { },
        blogPostId: () => { },
        commentAdd: () => { },
        reset: () => { },
        handleSubmit: () => { },
        pristine: () => { },
        submitting: () => { },
        error: () => { },
    }

    onSubmit = (values) => {

        // console.log(values.meta)
        const { blogPostId, commentAdd, reset } = this.props
        return commentAdd(values.content, blogPostId).then(() => (reset()))
    }

    render() {
        const { handleSubmit, pristine, submitting, error } = this.props
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                {/* {console.log(this.props.error)} */}
                <div className="card-body">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        {/* {console.log(error)} */}
                        <Field name='content' label='type your comment!' type='textarea' component={renderField} propError={error} />
                        <button type="submit" className="btn btn-primary btn-big btn-block" disabled={submitting || pristine}>Submit</button>
                    </form>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = ({
    commentAdd
})

const formWrapped = reduxForm({
    form: 'commentForm'
})(CommentForm)

export default connect(null, mapDispatchToProps)(formWrapped)