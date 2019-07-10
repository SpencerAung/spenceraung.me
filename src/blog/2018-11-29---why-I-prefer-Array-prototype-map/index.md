---
path: "/blog"
date: "2018-11-29"
title: "Why I prefer Array methods over for loop"
---
Even though, for loop is faster, I personally prefer array methods. The ones I mostly end up using are map, filter and reduce.

I have a few good reasons to use them.

1. The code is cleaner so it is much easier to understand.
2. We can reuse the callback function
3. Less side effects because it returns a new array. Original array is not modified. Except for [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), it performs the callback function directly on each item of the array. 

Let's see what we can do with array methods!

### Finding the sum of all numbers in an array

Let's start with for loop.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let sum = 0;

for(let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
```
<br>

Now we can do that in one line using [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

```javascript
const sum = numbers.reduce((acc, num) => acc + num, 0);
```
<br>

We can even reuse the function to add to two numbers like this

```javascript
function add(a, b) {
  return a + b;
}

const sum = numbers.reduce(add, 0);

add(2,3);
add(8,12);
```

### Counting characters

Let's say we want to count the occurrence of each character in a string. I will try using for loop first.

```javascript
const str = 'Winter is here';
const charMap = {};

// remove whitespace characters from string
const cleanStr = str.toLowerCase().replace(/\s*/g, '');

// We will store each characters as an object key
// and its occurrence as the value
for (let i = 0; i < cleanStr.length; i++) {
  if (charMap[cleanStr[i]]) {
    // The character already exists, so we will count up one
    charMap[cleanStr[i]] += 1;
  } else {
    // Initialize the new character count with one
    charMap[cleanStr[i]] = 1;
  }
}

charMap; // { w: 1, i: 2, n: 1, t: 1, e: 3, r: 2, s: 1, h: 1 }
```

Now let's try to do that using `reduce`. I will assume that input string is in lowercase and that there is no whitespace characters.

```javascript
const charMap = cleanStr.split('').reduce((acc, char) => {
  acc[char] = acc[char] ? acc[char] + 1 : 1;
  return acc;
}, {});
```

This time I am using ternary operator instead of if-else condition statement. Both of them serve the same thing. 

One obvious thing here is that with `reduce`, we don't need to care about indexes at all.

### Generating data from previous records

Assume that you have a set of price data that have a direction property. The direction of current price is calculated based on previous price. If the current price is greater, the direction is `UP`. If lower, direction is `DOWN`. If the price is the same, we will carry over the previous price's direction.

We will make some sample records.

```
const recentPrices = [
  { price: 100, direction: 'UP', order: 4 },
  { price: 90, direction: 'UP', order: 3 },
  { price: 80, direction: 'DOWN', order: 2 },
  { price: 85, direction: 'UP', order: 1 },
  { price: 85, direction: 'UP', order: 0 },
];

const newPrices = [
  { price: 120, direction: null, order: 5 },
  { price: 100, direction: null, order: 6 },
  { price: 95, direction: null, order: 7 },
];

```

Now, we will 

```


```