import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {
    blogPostAdd,
    blogPostFormUpload,
    imageDelete
} from '../actions'
import { canWriteBlogPosts } from '../api/apiUtils'
import { Redirect } from 'react-router'
import { renderField } from '../form'
import history from '../history'
import ImageUpload from './ImageUpload'
import ImageBrowser from './ImageBrowser'

class BlogPostForm extends Component {
    static propTypes = {
        userData: PropTypes.object,
        blogPostAdd: PropTypes.func,
        images: PropTypes.array,
        blogPostFormUpload: PropTypes.func,
        imageDelete: PropTypes.func,
    }
    static defaultProps = {
        userData: {},
        blogPostAdd: () => { },
        images: [],
        blogPostFormUpload: () => { },
        imageDelete: () => { }
    }

    componentWillUnmount() {
        this.props.blogPostFormUpload()
    }

    onSubmit = ({ title, content }) => {
        const { blogPostAdd, reset, images } = this.props
        return blogPostAdd(title, content, images)
            .then(() => {
                reset()
                history.push('/')
            })
    }

    render() {
        const {
            userData,
            handleSubmit,
            submitting,
            pristine,
            error,
            images,
            isImageUploading,
            imageDelete
        } = this.props

        if (!canWriteBlogPosts(userData)) {
            return <Redirect to="login" />
        }
        return (
            <div className="card mt-3 mb-3 shadow-sm">
                <div className="card-boy">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name="title" label="Title:" type="text" component={renderField} />
                        <Field name="content" label="Content:" type="textarea" component={renderField} />
                        <ImageUpload />
                        <ImageBrowser images={images} deleteHandler={imageDelete} />
                        <button
                            type="submit"
                            className="btn btn-primary btn-big btn-block"
                            disabled={submitting || pristine || isImageUploading} >
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
    // console.log(...state.blogPostForm)
    return {
        userData: state.auth.userData,
        ...state.blogPostForm,
    }
}

const mapDispatchToProps = ({
    blogPostAdd,
    blogPostFormUpload,
    imageDelete,
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm)