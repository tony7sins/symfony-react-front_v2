import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { baseURL } from '../api/constants'

export default class ImageBrowser extends Component {
    static propTypes = {
        images: PropTypes.array,
    }
    static defaultProps = {
        images: [],
    }

    render() {
        const { images } = this.props

        return (
            <div className="row mt-4 mb-4">
                {images.map(image => {
                    return (
                        <div key={image.id} className="col-md-6 col-lg-4">
                            {/* {console.log(image)} */}
                            <div className="mt-2 mb-2">
                                <img alt={`number ${image.id}`} className="img-fluid" src={`${baseURL}/${image.url}`} />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
