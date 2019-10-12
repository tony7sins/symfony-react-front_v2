import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Paginator extends Component {
    static propTypes = {
        currentPage: PropTypes.number,
        pageCount: PropTypes.number,
    }
    static defaultProps = {
        currentPage: 1,
        pageCount: 0,
    }
    state = {
        range: [],
    }

    componentDidMount() {
        const { pageCount } = this.props
        this.setPageCount(pageCount)
        this.setRange(pageCount)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.pageCount)
        console.log(this.props.pageCount)
        if (prevProps.pageCount !== this.props.pageCount && prevProps.pageCount === 0) {
            return this.setRange(this.state.pageCount)
        }
    }

    setPageCount = (count) => {
        this.setState({
            pageCount: count
        })
    }

    setRange(count) {
        let arr = this.state.range
        for (let i = 1; i <= count; i++) {
            arr.push(i)
        }
        this.setState({
            range: arr
        })
    }


    render() {
        const { currentPage } = this.props
        return (
            <nav>

                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link">
                            Prev
                        </button>
                    </li>
                    {
                        this.state.range.map(page => (
                            <li key={page} className={classNames('page-item', { active: currentPage === page })}>
                                <button className='page-link'>
                                    {page}
                                </button>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <button className="page-link">
                            Next
                            </button>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Paginator