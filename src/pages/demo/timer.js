import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Counter from '../../projects/timer/Counter'
import Timer from '../../projects/timer/Timer'
import Stopwatch from '../../projects/timer/Stopwatch'

const TimerDemoPage = () => {
  const [isPause, pauseCounter] = useState(false)
  const [status, updateStatus] = useState('running')

  return (
    <Layout>
      <SEO title='React timer component demo' />
      <div>
        <h3>Count down to 0</h3>
        <button onClick={() => pauseCounter(!isPause)}>
          {isPause ? 'play' : 'pause'}
        </button>
        <h4>
          Counting...{' '}
          <Counter
            start={10}
            step={-1}
            end={0}
            isPause={isPause}
            onCounterPause={() => updateStatus('paused')}
            onCounterResume={() => updateStatus('running')}
            onCounterEnd={() => updateStatus('stopped')}
          >
            {(current) => current}
          </Counter>
        </h4>
        <p>Counter status: {status}</p>
      </div>

      <div>
        <h3>Timer</h3>
        <Timer duration={120} isPause={false} />
      </div>

      <div>
        <h3>Count Down Timer</h3>
        <Timer duration={120} isPause={false} countDown />
      </div>

      <div>
        <h3>Stopwatch</h3>
        <Stopwatch isPause />
      </div>
    </Layout>
  )
}

export default TimerDemoPage
