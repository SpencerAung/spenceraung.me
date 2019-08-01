import React, { useState } from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import Counter from '../../projects/timer/Counter'

const TimerDemoPage = () => {
  const [isPause, pauseCounter] = useState(false)
  return (
    <Layout>
      <SEO title='React timer component demo' />
      <div>
        <h3>Count down to 0</h3>
        <button onClick={() => pauseCounter(!isPause)}>
          {isPause ? 'play' : 'pause'}
        </button>
        <h4>
          Counting... <Counter start={10} step={-1} end={0} isPause={isPause} />
        </h4>
      </div>
    </Layout>
  )
}

export default TimerDemoPage
