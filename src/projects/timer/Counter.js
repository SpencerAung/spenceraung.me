import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number,
    isPause: PropTypes.bool,
    onCounterEnd: PropTypes.func,
    onCounterPause: PropTypes.func,
    onCounterResume: PropTypes.func,
    children: PropTypes.func.isRequired
  }

  static defaultProps = {
    onCounterEnd: () => {},
    onCounterPause: () => {},
    onCounterResume: () => {},
    delay: 1000,
    isPause: false
  }

  state = {
    current: this.props.start
  }

  componentDidMount () {
    this.startCounter()
  }

  componentWillUnmount () {
    // cleanup counter
    this.stopCounter()
  }

  componentDidUpdate (prevProps) {
    if (this.props.isPause !== prevProps.isPause) {
      if (this.props.isPause) {
        this.stopCounter()
        this.props.onCounterPause()
      } else {
        this.startCounter()
        this.props.onCounterResume()
      }
    }
  }

  startCounter () {
    this.counterId = setInterval(() => {
      const { current } = this.state
      const { end, step } = this.props

      if (current !== end) {
        this.setState({
          current: current + step
        })
      } else {
        this.stopCounter()
      }
    }, this.props.delay)
  }

  stopCounter () {
    if (this.counterId) {
      clearInterval(this.counterId)

      if (!this.props.isPause) {
        this.props.onCounterEnd()
      }
    }
  }

  render () {
    return <>{this.props.children(this.state.current)}</>
  }
}

export default Counter
