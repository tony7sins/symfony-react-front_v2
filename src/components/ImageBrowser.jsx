import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { baseURL } from '../api/constants'
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
                <TransitionGroup component={null}>
                    {images.map(image => {
                        return (
                            <CSSTransition key={image.id} timeout={1000} classNames='fade'>
                                <div className="col-md-6 col-lg-4">
                                    {/* {console.log(image)} */}
                                    <div className="mt-2 mb-2">
                                        <img alt={`number ${image.id}`} className="img-fluid" src={`${baseURL}/${image.url}`} />
                                    </div>
                                    <div className="mb-2">
                                        <button type="button" className="btn btn-outline-danger btn-sm">
                                            Delete!
                                        </button>
                                    </div>
                                </div>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>

            </div>
        )
    }
}
