import './ImageUpload.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { imageUpload } from '../actions'
// import PropTypes from 'prop-types'

class ImageUpload extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    onChange = (e) => {
        // console.log(e.target)
        // console.log(e.target.files[0])
        const file = e.target.files[0]
        this.props.imageUpload(file)
    }

    render() {
        return (
            <div className="image-upload form-group">
                <input
                    className="image-upload-input form-control-file text-primary font-weight-bold"
                    type="file"
                    onChange={this.onChange}
                    data-title="Click me or drag and drop the file"
                />
            </div>
        )
    }
}

const mapStateToProps = null

const mapDispatchToProps = {
    imageUpload
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
