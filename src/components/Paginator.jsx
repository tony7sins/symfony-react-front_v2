import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Paginator extends Component {
    static propTypes = {
        currentPage: PropTypes.number,
        pageCount: PropTypes.number,
        setPage: PropTypes.func,
        prevPage: PropTypes.func,
        nextPage: PropTypes.func,
    }
    static defaultProps = {
        currentPage: 1,
        pageCount: 0,
        setPage: () => { },
        prevPage: () => { },
        nextPage: () => { },
    }
    state = {
        range: [],
    }

    componentDidMount() {
        const { pageCount } = this.props
        this.setPageCount(pageCount)
        this.setRange(pageCount)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pageCount !== this.props.pageCount) {
            return this.setRange(this.props.pageCount)
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
        const { currentPage, setPage, prevPage, nextPage } = this.props
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-link" onClick={prevPage}>
                            Prev
                        </button>
                    </li>
                    {
                        this.state.range.map(page => {
                            const onClick = () => setPage(page)
                            return (
                                <li key={page} className={classNames('page-item', { active: currentPage === page })}>
                                    <button className='page-link' onClick={onClick}>
                                        {page}
                                    </button>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <button className="page-link" onClick={nextPage}>
                            Next
                            </button>
                    </li>
                </ul>

            </nav>
        )
    }
}

export default Paginator