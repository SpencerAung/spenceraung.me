import React from 'react'
import PropTypes from 'prop-types'
import Counter from './Counter'

const Timer = ({
  onTimerPause,
  onTimerResume,
  onTimerEnd,
  isPause,
  duration,
  countDown
}) => {
  let start = 0
  let end = duration
  let step = 1

  if (countDown) {
    start = duration
    end = 0
    step = -1
  }

  return (
    <Counter
      start={start}
      end={end}
      step={step}
      onCounterEnd={onTimerEnd}
      onCounterResume={onTimerResume}
      onCounterPause={onTimerPause}
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
}

Timer.propTypes = {
  onTimerPause: PropTypes.func,
  onTimerResume: PropTypes.func,
  onTimerEnd: PropTypes.func,
  isPause: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  countDown: PropTypes.bool
}

Timer.defaultProps = {
  onTimerPause: () => {},
  onTimerResume: () => {},
  onTimerEnd: () => {},
  isPause: false,
  countDown: false
}

export default Timer
