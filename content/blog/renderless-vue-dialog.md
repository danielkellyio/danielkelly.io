---
title: Renderless Dialogs (Alert, Confirm, and Prompt) in Vue
description: Make a flexible, customizable, potentially pretty, and functional replacement for `alert()`, `prompt()`, and `confirm()` in Vue.
publishDate: 2020-11-23 12:00:00
github: https://github.com/danielkellyio/renderless-dialog
---

## What We're Making
[Jump to Demo](#demo)

Javascript has a few handy functions used to interrupt the users workflow and warn them of something or get feedback from them. Those functions are `alert()`, `prompt()`, and `confirm()`. While these functions are very easy to use they come with a few drawbacks:
1. They cannot be styled
2. They look different across different browsers
3. They can only contain plain text
4. The prompt can only accept text input (no checkbox, selects, etc)
5. You can't customize the button text

While I really like the ease of use these functions provide, I don't like working within the restraints put on them. Therefore, today we're going to build a "renderless dialog" object that will mimic the behavior of `alert()`, `prompt()`, and `confirm()`.

The interface for our dialog object will look like so:
```javascript
/*
 * Alert
 */
await dialog.alert(message)
// carry on only after alert is dismissed

/*
 * Confirm
 */
const confirmed = await dialog.confirm(message)
if(confirmed){
    // do the thing needing confirming
}else{
    // don't
}

/*
 * Prompt
 */
const value = await dialog.prompt(message)
console.log(value) // the result of the prompt
```

I hope these look familiar. They look just like the native functions but are methods of a `dialog` object and must be `await`ed.



## Why Renderless?
Renderless means our code doesn't concern itself with how the "dialog" is actually rendered. The benefit here is that we can reuse our dialog object over and over in any Vue project no matter what component library (if any) we are using. The dialog object doesn't care what the dialog actually looks like: where it's positioned, what the button size is, etc, or if you use Bulma, Boostrap, or Tailwind.

## Dialog State
The first thing we do is add an object to keep track of the state of our dialog. We wrap it in `Vue.observable()` to make it reactive.
```javascript
//dialog.js
import Vue from 'vue'

const state = Vue.observable({
    type: 'alert', // the type of dialog 
    active: false, // if the dialog is open or not
    message: '', // what the dialog will say
})
```

## Dialog Promise
We can't actually wait on the user like the native alert, prompt, and confirm, so we'll do the next best thing and return a promise. The promise can then be `await`ed wherever we use our dialog methods.

```javascript
// dialog.js
let close;
const dialogPromise = () => new Promise((resolve, reject) => close = resolve);
``` 

You'll notice our dialogPromise is actually a function that returns a promise. That's so that every new dialog get its own promise to be resolved. Also the close variable holds the resolve method of our promise so that it can be called via our dialog interface (which you'll see momentarily).

## Dialog Object
Finally we come to our dialog object. Let's add just the `alert()` function to begin with.
```javascript
const dialog = {
    // allow public access to the state without allowing it to be mutated outside of our exposed api
    get state(){
        return state
    },

    // The alert function simply sets some state and then returns our dialog promise
    alert(message){
        state.type = 'alert'
        state.message = message
        state.active = true
        return dialogPromise()
    },

    //ok exposes a method than can be called to close the alert (probably to be called on OK button click)
    ok(){
        close(true) // this resolves our dialog promise 

        // reset the dialog after close
        state.active = false
        state.message = ''
    }
}
```

After the alert is in place the confirm and prompt don't look much different.
```javascript
const dialog = {
    // ...
    confirm(message){
        state.type = 'confirm'
        state.message = message
        state.active = true
        return dialogPromise()
    },
    prompt(message){
        state.type = 'prompt'
        state.message = message
        state.active = true
        return dialogPromise()
    },

    // prompt and confirm must provide the ability to cancel
    cancel(){
        close(false)
        state.active = false
        state.message = ''
    },
    // prompt requires ok to resolve to some user input
    ok(input=true){
        input = state.type === 'prompt' ? input: true
        close(input)
        state.active = false
        state.message = ''
    }
}
```

## Refactoring 
You'll notice now that we have some room for a little refactoring. There is some duplicate code in the prompt, alert, and confirm methods. The duplicate code looks like this:
```javascript
state.message = message
state.active = true
return dialogPromise()
```

Let's extract that into a function called open() since that's what must occur to open each type of dialog. We'll make it into a function above the dialog object since we don't want to expose it in the dialog's public interface.
```javascript
const open = (message) =>{
    state.message = message
    state.active = true
    return dialogPromise()
}
``` 
We also have a little room to refactor our ok and cancel methods. These lines are duplicated in each.
```javascript
state.active = false
state.message = ''
```

These lines serve to reset the dialog after it's closed so let's make a private reset function.
```javascript
const reset = () =>{
    state.active = false
    state.message = ''
    state.type = 'alert' // let's go ahead and set the type back to the default alert here just for cleanliness
}
```

## Refactored Code 
After the refactors above we're left with the following clean and simple code.
```javascript
//dialog.js

import Vue from 'vue'
const state = Vue.observable({
    type: 'alert',
    active: false,
    message: '',
})

//-----------------------------------
// Private Methods
//-----------------------------------
let close; // will hold our promise resolve function
const dialogPromise = () => new Promise((resolve) => close = resolve);
const open = (message) =>{
    state.message = message
    state.active = true
    return dialogPromise()
}
const reset = () =>{
    state.active = false
    state.message = ''
    state.type = 'alert'
}

//-----------------------------------
// Public interface
//-----------------------------------

const dialog = {
    get state(){
        return state
    },
    alert(message){
        state.type = 'alert'
        return open(message)
    },
    confirm(message){
        state.type = 'confirm'
        return open(message)
    },
    prompt(message){
        state.type = 'prompt'
        return open(message)
    },
    cancel(){
        close(false)
        reset()
    },
    ok(input=true){
        input = state.type === 'prompt' ? input: true
        close(input)
        reset()
    }
}

export default dialog

```
### Adding Options for Customization
As of now we've recreated the native methods and addressed issues 1 & 2 stated at the beginning of the article. With the groundwork laid, now it's trivial to address the other issues.
```javascript
// add more state properties
const state = Vue.observable({
    type: 'alert',
    active: false,
    message: '',
    title: '',
    okText: 'Ok',
    cancelText: 'Cancel',
    inputType: 'text',
    html: false,
})

// add extra state props to reset
const reset = () => {
  state.active = false
  state.message = ''
  state.okText = 'Ok'
  state.cancelText = 'Cancel'
  state.inputType = 'text'
  state.html = false
  state.title = ''
  state.type = 'alert'
}
const dialog = {
    // ...
    title(title){
        state.title = title
        return this
    },
    okText(text){
        state.okText = text
        return this
    },
        
    cancelText(text){
        state.cancelText = text
        return this
    },
    inputType(type){
        state.inputType = type
        return this
    },
    html(enabled = true){
        state.html = enabled
        return this
    },
    //...
}
``` 

The above allows us to make all kinds of customizations in a chainable manner.
```javascript
const confirmed = await dialog
    .cancelText('Nevermind')
    .okText('Delete Forever')
    .html()
    .confirm('Are you sure you want to delete <strong>Fancy Document Thing</strong>')
```

## Putting it to Use
Ultimately, even though our dialog is renderless, it is useless unless we actually render it. Here is an example of rendering the dialog as a Vue component. It's a simple matter of showing/hiding particular elements based on the dialog state and using the dialog methods to cancel and confirm. The code below is exactly what powers the dialogs on this site.
```vue
<template>
  <transition name="dialog">
    <div v-if="dialog.state.active" class="dialog">
      <div class="dialog-inner rounded shadow">
        <h3 v-if="dialog.state.title" class="text-xl mb-2">
          {{ dialog.state.title }}
          <hr />
        </h3>

        <p v-if="dialog.state.html" v-html="dialog.state.message"></p>
        <p v-else>{{ dialog.state.message }}</p>

        <div class="my-4">
          <input
            v-if="dialog.state.type === 'prompt'"
            v-model="userInput"
            class="border-2 block w-full"
            :type="dialog.state.inputType"
            @keypress.enter="dialog.ok(userInput)"
          />
        </div>

        <div class="flex justify-end mt-2">
          <dk-button
            v-if="dialog.state.type !== 'alert'"
            class="bg-gray-400 text-gray-900 mr-3"
            @click="dialog.cancel()"
          >
            {{ dialog.state.cancelText }}
          </dk-button>
          <dk-button @click="dialog.ok(userInput)">{{
            dialog.state.okText
          }}</dk-button>
        </div>
      </div>
      <div class="dialog-bg" @click="dialog.cancel()"></div>
    </div>
  </transition>
</template>

<script>
import dialog from '~/support/dialog'
export default {
  data() {
    return {
      userInput: '',
      dialog,
    }
  },
}
</script>

<style>
.dialog {
  transition: 0.3s ease all;
}
.dialog-enter .dialog-bg {
  opacity: 0;
}

.dialog-leave-active .dialog-bg {
  opacity: 0;
}

.dialog-enter .dialog-inner,
.dialog-leave-active .dialog-inner {
  opacity: 0;
  transform: translateY(-50px) translateX(-50%);
}
.dialog-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: all 0.3s ease;
}
.dialog-inner {
  will-change: contents;
  transform-origin: center;
  transition: all 0.3s ease-out;
  background: white;
  z-index: 2;
  padding: 20px;
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 400px;
  opacity: 1;
}
</style>
```

## Demo
<demo-widget :slug="slug"></demo-widget>

## Conclusion
There you have it, A flexible, customizable, potentially pretty, and functional replacement for `alert()`, `prompt()`, and `confirm()` in Vue. Check out the [git repo](https://github.com/danielkellyio/renderless-dialog) to see the full codebase and unit tests. If you use the dialog object to render your own alerts, prompts, and confirms, hit me up on twitter [@danielkelly_io](https://twitter.com/danielkelly_io) so I can see the awesome stuff you've made!
