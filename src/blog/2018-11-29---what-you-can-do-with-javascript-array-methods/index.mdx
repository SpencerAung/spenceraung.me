---
path: "/blog"
date: "2018-11-29"
title: "What you can do with JavaScript Array methods"
lang: "en"
tags: ["JavaScript", "beginner", "array"]
---
Even though, code implemented in for-loop may run faster, I prefer array methods and use them all the time.

### Reasons

I have a few good reasons to use them.

1. Unlike a loop, the code is cleaner without the index variables and expressions(initialization, condition and final).
3. Less side effects because it returns a new array. Original array is not modified. Except for [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), it performs the callback function directly on each item of the array. 

Let's see what we can do with array methods!

### Finding the sum of all numbers in an array

Let's start with for loop.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
let sum = 0

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i]
}
```
<br>

Now we can do that in one line using [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

```javascript
const sum = numbers.reduce((acc, num) => acc + num, 0)
```
<br>

We can even reuse the function to add to two numbers like this

```javascript
function add (a, b) {
  return a + b
}

const sum = numbers.reduce(add, 0)

add(2, 3)
add(8, 12)
```

### Counting characters

Let's say we want to count the occurrence of each character in a string. I will try using for loop first.

```javascript
const str = 'Winter is here'
const charMap = {}

// remove whitespace characters from string
const cleanStr = str.toLowerCase().replace(/\s*/g, '')

// We will store each characters as an object key
// and its occurrence as the value
for (let i = 0; i < cleanStr.length; i++) {
  if (charMap[cleanStr[i]]) {
    // The character already exists, so we will count up one
    charMap[cleanStr[i]] += 1
  } else {
    // Initialize the new character count with one
    charMap[cleanStr[i]] = 1
  }
}

charMap // { w: 1, i: 2, n: 1, t: 1, e: 3, r: 2, s: 1, h: 1 }
```

Now let's try to do that using `reduce`. I will assume that input string is in lowercase and that there is no whitespace characters.

```javascript
const charMap = cleanStr.split('').reduce((acc, char) => {
  acc[char] = acc[char] ? acc[char] + 1 : 1
  return acc
}, {})
```

This time I am using ternary operator instead of if-else condition statement. Both of them serve the same thing. 

One obvious thing here is that with `reduce`, we don't need to care about indexes at all.
