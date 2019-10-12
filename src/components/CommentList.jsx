import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './CommentList.css'

const CommentList = ({ commentList }) => {

    // const {} = props.commentList
    // console.log(commentList)
    return (
        <Fragment >
            <TransitionGroup>
                {commentList && commentList.map(({ id, content, published = '', author }) => {
                    return (
                        <CSSTransition key={id} timeout={1000} classNames='fade'>
                            <div className="card-body border-buttom">
                                <p className="card-text mb-0">{content}</p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        <TimeAgo
                                            datetime={published}
                                            locale='ru'
                                        />
                                        by &nbsp; {author.name}
                                    </small>
                                </p>
                            </div>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </Fragment>
    )
}

CommentList.propTypes = {

}

export default CommentList
