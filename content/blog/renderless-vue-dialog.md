---
title: Renderless Dialogs (Alert, Confirm, Prompt) in Vue
description: Learn how to use @nuxt/content.
github: https://github.com
---

## What We're Making
Javascript has a few handy functions used to interrupt the users workflow and warn them of something or get feedback from them. Those functions are `alert()`, `prompt()`, and `confirm()`. While these functions are very easy to use they come with a few drawbacks:
1. They cannot be styled
2. They look different across different browsers
3. They can only contain plain text
4. The prompt can only accept text input (no checkbox, selects, etc)

While I really like the ease of use these functions provide, I don't like working within the restraints put on them. Therefor, today we're going to build a "rendeless dialog" object that will mimic the behavior of `alert()`, `prompt()`, and `confirm()`.

The interface for our dialog object will look like so:
```javascript
await dialog.alert(message)
// carry on only after alert is dismissed
```

```javascript
const confirmed = await dialog.confirm(message, optionalTitle, options)
if(confirmed){
    // do the thing needing confirming
}else{
    // don't
}
```

```javascript
const value = await dialog.prompt(message)
console.log(value) // the result of the prompt
```

I hope these look familiar. They look just like the native functions but are methods of a `dialog` object and must be `await`ed.
## Why Renderless?
Renderless means our code doesn't concern itself with how the "dialog" is actually rendered. The benefit here is that we can reuse our dialog object over and over in any Vue project no matter what component library (if any we are using). The dialog object doesn't care what the dialog actually looks like: where it's positioned, what the button size is, etc, or if you use Bulma, Boostrap, or Vuetify.

## Alert Function
The first thing we do is add an object wrapped in a `Vue.observable()` to keep track of the state of our dialog.
```javascript
//dialog.js
import Vue from 'vue'
let interval  = null;
export const data = Vue.observable({
    active: false,
    message: '',
    confirmed: false
});
```
Now we can expose the alert function. It starts by adding our message to the state and informing the state that the alert is now active. Because we can't actually wait on the user like the native alert, we'll do the next best thing and return a promise. The promise can then be `await`ed wherever we use `dialog.alert`. Then we can set a quick running interval that will constantly check the confirm property of our state and only resolve once the confirm property is true. This means that, all the rendered component we end up hooking this up to has to do, is change the confirmed state to true on the "Ok" click of an alert.

```javascript
const interval = null
const dialog = {
alert(message){
    data.message = message
    data.active = true
    return new Promise((resolve, reject)=>{
            interval = setInterval(()=>{
                if(data.confirmed){
                    data.confirmed = false
                    data.active = false
                    resolve(true)
                }
            }, 50)
        })
},
}
export default dialog
```
## 
## Confirm Function
## Refactor Overlap
## Prompt Function
## Putting it to Use

