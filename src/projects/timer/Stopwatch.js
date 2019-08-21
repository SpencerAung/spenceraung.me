import React from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'

const Stopwatch = ({ onPause, onResume, onEnd, isPause, maxDuration }) => (
  <Counter
    start={0}
    step={1}
    end={maxDuration}
    onCounterEnd={onEnd}
    onCounterResume={onResume}
    onCounterPause={onPause}
    isPause={isPause}
  >
    {(current) => {
      const min = parseInt(current / 60, 10)
      const sec = parseInt(current % 60, 10)
      const paddedMin = min < 10 ? `0${min}` : min
      const paddedSec = sec < 10 ? `0${sec}` : sec

      return `${paddedMin}:${paddedSec}`
    }}
  </Counter>
)

Stopwatch.propTypes = {
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onEnd: PropTypes.func,
  isPause: PropTypes.bool,
  maxDuration: PropTypes.number
}

Stopwatch.defaultProps = {
  onTimerPause: () => {},
  onTimerResume: () => {},
  onTimerEnd: () => {},
  isPause: false,
  maxDuration: 300
}

export default Stopwatch
