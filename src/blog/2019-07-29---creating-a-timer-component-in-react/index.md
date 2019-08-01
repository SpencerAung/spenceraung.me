---
path: "/blog"
date: "2019-07-29"
title: "Creating a timer component in React"
lang: "en"
tags: ["JavaScript", "react", "beginner"]
---

How does a timer help you? Well, I don't know about you but it helps me in so many ways like -
* making sure my meal is not burnt
* making sure I hung the clean laundry
* timing my workouts that I *just wish to end* as soon as I started them
* waking me up from my power naps so I don't miss any work
* record my social media browsing time

Okay, that's enough motivation for me to build my own timer!

## How it's gonna work

Let's cut to the chase and create a timer component which we can -
* customizable start and end value
* start the timer
* pause/resume
* do something when the timer ends


## Let's build a counter first!
### Define the props
First, I want to make generic counter which can count up or down depending on the props. So what are those props? I am guessing, we would need -
* `start`: this would be the initial counter value
* `end`: we need to stop the counter at some point. That would be `end` value. 
When the counting value reaches this value, we will stop the counter.
* `step`: we will use this value to get the next counter value
* `delay`: we will need some delay before calculating the next value. It could be a second, 1 min or whatever we want it to be. We are making this customizable by accepting a prop.

I think it is enough to build the component.

```JavaScript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 1000 // 1 sec defined in milliseconds
  }

  state = {
    current: this.props.start
  }

  componentDidMount () {
    // This is where we wll start the counter
  }

  componentWillUnmount () {
    // We should cleanup the counter, when the component is about to be unmounted.
  }

  render () {
    return <>{this.state.current}</>
  }
}

export default Counter
```

Btw, if you are wondering what these `<>...</>` are. It is react [Fragment](https://reactjs.org/docs/fragments.html) in short syntax. Make sure you are using react version 16.0 or above to use Fragments.

### Implement counting logic

Okay! We have defined the props. Next, we will add the counting function. We need two functions: one to start counter and another one to clean up the counter because we will be using [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) method.

```JavaScript
startCounter() {
  // setInterval returns an ID which we will save in it counterId variable.
  // We can use that ID to clear the interval, in other words, to stop the counter
  this.counterId = setInterval(() => {
    const { current } = this.state
    const { end, step } = this.props

    if (current !== end) {
      this.setState({
        current: current + step
      })
    } else {
      // when the current value reaches the end, we should stop the counter.
      this.stopCounter()
    }
  }, this.props.delay)
}

// this will put a stop to the counter
stopCounter() {
  if (this.counterId) {
    clearInterval(this.counterId)
  }
}
```

Note that, I am using a class property `counterId` to store the interval ID because we don't need to re-render the component when `counterId` value changes.

Now we should run those methods to make the counter works. I am thinking of starting the counter as soon as the component is loaded. We should also clean up when the component is destroyed. We can do that by using react's life cycle methods: `componentDidMount` and `componentWillUnmount`.

```JavaScript
componentDidMount() {
  this.startCounter()
}

componentWillUnmount() {
  this.stopCounter()
}
```

### Putting it all together

```JavaScript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 1000 // 1 sec defined in milliseconds
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
    }
  }

  render () {
    return <>{this.state.current}</>
  }
}

export default Counter
```


Here we have a basic counter, which will start counting as soon as the component is loaded. You can set `start, step, end` props and start using like this.

```JavaScript{5}
const CountDown = () => (
  <div>
    <h3>Count down to 0</h3>
    <h4>
      Counting... <Counter start={10} step={-1} end={0} />
    </h4>
  </div>
)
```
⬇️ ⬇️ ⬇️ ️

![Basic counter component demo image](timer-count-down-to-zero-480p.gif)

### More functions!

According to the agenda, we still have two requirements to work on.
* pause/resume counter
* do something when the counter ends

#### Pause/resume

To support this, we need to introduce a new prop called `isPause` which will let us know when to pause or restart the timer.

```JavaScript{7,12}
class Counter extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number,
    isPause: PropTypes.bool,
  }

  static defaultProps = {
    delay: 1000, // 1 sec defined in milliseconds
    isPause: false
  }
```


```JavaScript
componentDidUpdate(prevProps) {
  // We need to check if isPause has a different value
  if (this.props.isPause !== prevProps.isPause) {
    if (this.props.isPause) {
      this.stopCounter()
    } else {
      this.startCounter()
    }
  }
}
```
<br />

## Moving on to making a timer
