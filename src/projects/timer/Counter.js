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
    onCounterStart: PropTypes.func
  }

  static defaultProps = {
    onCounterEnd: () => {},
    onCounterStart: () => {},
    delay: 1000,
    isPause: false
  }

  state = {
    current: this.props.start
  }

  componentDidMount () {
    this.startCounter()
    this.props.onCounterStart()
  }

  componentWillUnmount () {
    // cleanup counter
    this.stopCounter()
  }

  componentDidUpdate (prevProps) {
    if (this.props.isPause !== prevProps.isPause) {
      if (this.props.isPause) {
        this.stopCounter()
      } else {
        this.startCounter()
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
      this.props.onCounterEnd()
    }
  }

  render () {
    return <>{this.state.current}</>
  }
}

export default Counter
