---
path: "/blog"
date: "2019-08-21"
title: "Creating a reusable timer component in React"
lang: "en"
tags: ["JavaScript", "react", "beginner"]
---

When you talk about a timer, it can be one of the three: *count-down timer*, *count-up timer* or a *stop-watch timer*. Is it possible to create one component that satisfies all cases? Yes, we will explore on how we can create one React component and reuse it to make different timers.

## Component break down

Behind the hood, timer uses counting mechanism. So Let's create a Counter component which will be the core of different Timer components. Our Counter component should be able to -
* accept start, end, step and delay value
* do something when the counter stops
* do something when the counter pauses/resumes
* do something when the counter ends

## Setting the props

We can define the props like this.

```JavaScript
class Counter extends Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number,
    isPause: PropTypes.bool
  }

  static defaultProps = {
    delay: 1000,
    isPause: false
  }

  state = {
    current: this.props.start
  }

  render () {
    return <>{this.state.current}</>
  }
}
```
I have added an additional prop `isPause` which will be used as a flag for pause/resume state. We need to keep the current value as ther counter runs. Since we cannot mutate the props, we are copying`start` prop  into `current` state. When the counter starts, we will use it record the current counter value.

Btw, if you are wondering what these `<>...</>` are. It is React [Fragment](https://reactjs.org/docs/fragments.html) in short syntax. Make sure you are using React version 16.0 or above to use Fragments.

## Adding functionality

In a real world application, we might want to do something when the counter ends, e.g. showing an alert. As an addition to start/stop methods, we should support calling a function whenever counter changes its status from pause to resume or when it ends.

```JavaScript{3-5}
static propTypes = {
    // ...
    onCounterEnd: PropTypes.func,
    onCounterPause: PropTypes.func,
    onCounterResume: PropTypes.func
}
```

Now let's define the counter start and stop methods.

```JavaScript
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
```

In `startCounter`, we use `setInterval` method to start the counter. We apply the `step` on every `delay` interval until it reaches the `end`. When it reaches the end, we stop the counter by cleaning up the interval using `clearInterval` method. 

Remember, we want to do something on counter ends. We do that by calling `onCounterEnd` prop method inside `stopCounter`. 

## Using component life cycle methods

Previously, we defined the start and stop methods. But component won't do a thing because we haven't setup the actual function calls. For that, we will use React component life cycle methods. 

We want to start the counter as soon as the component is loaded. We can do that by calling `startCounter` in `componentDidMount`.

> `componentDidMount()` is invoked immediately after a component is mounted



```JavaScript
componentDidMount () {
  this.startCounter()
}
```

To cleanup the counter, we can use `componentWillUnmount` method.

> `componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed.

```JavaScript

componentWillUnmount () {
  // cleanup counter
  this.stopCounter()
}
```

Now, the tricky part is handling pause and resume functions. The catch here is we don't need to define new methods. We can reuse `startCounter` and `stopCounter` methods.

Remember we defined `isPause` prop? We will make use of this to handle counter pause/resume state. The logic is simple, if `isPause` is `true`, we stop the counter, otherwise, we start the counter. Now the question is how do we know when `isPause` changes.

Don't worry, we can use another React life cycle method. When `isPause` prop changes, it will trigger an update in component. After the update,`componentDidUpdate` life cycle method is invoked. So we can put a call to `startCounter` and `stopCounter` methods inside `componentDidUpdate`. And don't forget to run the `onCounterPause` and `onCounterResume` prop methods.

```JavaScript
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
```

Since we are using `stopCounter` to pause the counter. We need to know if counter has really stopped in order to call `onCounterEnd`. Again, we can use `isPause` prop to check if counter has stopped or is just paused.

```JavaScript{5-7}
stopCounter () {
  if (this.counterId) {
    clearInterval(this.counterId)

    if (!this.props.isPause) {
      this.props.onCounterEnd()
    }
  }
}
```

## Reusing Counter component

There are many [React patterns](https://reactpatterns.com). Some may prefer *higher order component* pattern but here, we will use *render prop* pattern to reuse the logic inside Counter component. Render prop pattern is pretty simple, the component accepts a function as `children` prop to render and to pass props.

In our case, we would want to pass `current` state into `children` render function like this.

```JavaScript
render () {
  return <>{this.props.children(this.state.current)}</>
}
```

Now, we have a reusable Counter component which we can use to make different types of timer.

```JavaScript
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
```

## Let's make a timer

With Counter component, we can easily make a Timer. 

```JavaScript
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
```

In the above example, you can change the timer's count down mode using `countDown` prop. Depending on the mode, step value is either `+1` or `-1`. 
We are passing in a render function to format the time as the `children` prop. 


## How about a stopwatch

It is very similar to Timer except it asks for `maxDuration` instead of `duration`. 

```JavaScript
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
```

In the example, we are simply displaying the time. But we could replace that with advanced UI components. You can even make different timer UI in this way.

## Summary

In summary, we made a Counter component with customizable properties. We also made use of React life cycle methods to trigger functions based on counter status. We took a step further and use *render prop* pattern to share the counting logic across different components. 

👏👏👏

Ref:
* React Fragment, https://reactjs.org/docs/fragments.html
* React Component, https://reactjs.org/docs/react-component.html
* React Patterns, https://reactpatterns.com