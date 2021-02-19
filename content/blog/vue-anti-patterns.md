---
title: 'Vue Anti-Patterns'
description: 'There are some coding patterns I find myself or others gravitating towards when building Vue applications but ultimately end up regretting down the road. These common coding practices are called anti-patterns.'
publishDate: 2021-01-30 12:00:00
github: null
tags:
  - Vue
---

There are some coding patterns I find myself or others gravitating towards when building Vue applications but ultimately end up regretting down the road. These common coding practices are called anti-patterns. Let's take a look at just a few and how we can avoid them.

## Loading Booleans

Loading booleans are probably something you've run into alot in Vue. In fact, I've used them myself many times. What are loading booleans? They are loading props of the data object meant to keep up with the status of an ajax request. They commonly look like this:

```javascript
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods(){
      async loadTheThing(){
          this.loading = true
          await theThingsAjaxRequest()
          this.loading = false
      }
  }
}
```

Look familiar? What in the world could be bad about this? Plainly put, the status of an ajax request is not a binary thing. You simply cannot accurately capture it's status with only 2 possible states. The loading boolean assumes the only states of an ajax request are pending or not pending but in reality an ajax request has 4 (sometimes 5) possible states:

1. Before
2. Pending
3. Success
4. Error
5. Canceled (sometimes)

With this in mind a more successful setup would look like this:

```javascript
 export default {
  data() {
    return {
      requestStatus: 'before',
    }
  },
  methods(){
      async loadTheThing(){
          this.requestStatus = 'pending'
          try{
            await theThingsAjaxRequest()
            this.requestStatus = 'success'
          }catch(error){
              this.requestStatus = 'error'
          }
      }
  }
}
```

It may seem like I'm splitting hairs, but this really can make a difference. Not only does this method force you to think more about the error state up front, it also keeps you from representing some truly impossible states. For instance, I've tried to keep up with the error state of the ajax request in another data property in parrallel with my loading boolean but that allowed for:

1. an error state while the request was still pending or
2. an error state before the request ever even began.

This not only made for a poor user experience from a confusing UI but depending on what other functionally is based around the ajax request could make things just plain not work.

Loading booleans are prevelant in many of the projects I've worked on or seen source code for. I'd highly recommend against them in favor of a method that can more accurately represent the ajax request cycle and it's distinct states.

## v-if on Component Root Element

I recently saw a [tweet from Markus Oberlehner](https://twitter.com/MaOberlehner/status/1353747260434227201) on this very issue and it makes a lot of sense. Really [go check it out](https://twitter.com/MaOberlehner/status/135374726043422720), the image very clearly makes the point. Instead of having a property on your component like `isActive` and then only using that property to display the whole of your component, just let the code where your component is being used apply a `v-if` to the component. The latter approach has 2 benefits:

1. the component is only mounted and loaded when the condition is met making things a little more performant
2. You're not making up some new interface (v-if is the standard) (is the prop `isActive`, `active`, `show`, what?)

## Mutations in Computed Properties

Computed properties are meant to serve one purpose:

## Vuex Anti-Patterns

### No Modules

### Automatic Solution

### Storing Local State in Vuex
