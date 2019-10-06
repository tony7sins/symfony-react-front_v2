import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'


const CommentList = ({ commentList }) => {

    // const {} = props.commentList
    // console.log(commentList)
    return (
        <Fragment >
            {commentList && commentList.map(({ id, content, published = '', author }) => {
                return (
                    <div key={id} className="card-body border-buttom">
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
                )
            }
            )}
        </Fragment>
    )
}

CommentList.propTypes = {

}

export default CommentList
