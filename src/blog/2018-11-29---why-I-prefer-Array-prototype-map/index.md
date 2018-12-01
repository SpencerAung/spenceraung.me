---
path: "/blog"
date: "2018-11-29"
title: "Why I prefer Array.prototype.map over for loop"
---

First of all, its just cleaner. Without all the array index variables, you can figure out more quickly what the code is trying to do. 

It also helps in code reusability, since you can pass the logic as a first order function which will be perform on each elements of the array.

Since a new array is returned, it introduces less side effects. Origin array elements will remain the same unless they are explicitly set. That might also mean something is not right with your logic.

You don’t need to figure out how many iterations are required. In most cases, you need to iterate over all elements in the array. Array.prototype.map does that automatically for you. 