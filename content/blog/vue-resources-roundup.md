---
title: Vue Resources Roundup
description: Up your Vue.js game quickly with plug and play components, plugins, etc. This is a list of some of my go to vue libraries.
publishDate: 2021-01-10 12:00:00
tags:
- Vue
---

Every Vue developer has some go to packages that they find themselves installing in almost every Vue project. This is a list of some of those packages that I've found most useful.

* [VueFormulate](#vueformulate)
* [Vue Async Computed](#vue-async-computed)
* [Vue Click Outside](#vue-click-outside)
* [Vue Split Panel](#vue-split-panel)
## VueFormulate
[Visit Site](https://vueformulate.com/)

![Vue Formulate Image](/vueformulate.jpg)

Vue Formulate claims to be the "easiest way to build forms with Vue" and I have to agree! It boasts a single input element, grouped fields, built in validation, easy extensibility, form generation, theming, scoped slots, and internationalization. The features that I find myself using the most are as follows:

### Single Input Element
All fields in VueFormulate share the exact same tag `<FormulateInput>` just with a different `type` attribute. That goes for text inputs, selects, and textareas. No more looping through select options, just pass it an array of options in an `options` property. 

### Form Schema
This is perhaps the most useful feature of VueFormulate. Since all fields are standardized it is super easy to create an entire form without a typing out a single `FormulateInput` component. The example from their website looks like this:
```vue
<template>
  <FormulateForm
    v-model="values"
    :schema="schema"
  />
</template>

<script>
export default {
  data () {
    return {
      values: {},
      schema: [
        {
          type: 'password',
          name: 'password',
          label: 'Enter a new password',
          validation: 'required'
        },
        {
          type: 'password',
          name: 'password_confirm',
          label: 'Confirm your password',
          validation: '^required|confirm:password',
          validationName: 'Password confirmation'
        },
        {
          type: 'submit',
          label: 'Change password'
        }
      ]
    }
  }
}
</script>
```
You'll find it not only feels good coding your forms this way, but that it is also easy to produce GUI generated forms using this method (simply use a GUI to generate a JSON schema). 

### Built in Validation
The last piece of VueFormulate I use all the time is it's built in validation. Often times without VueFormulate I'd end up installing one package to help with form inputs and then another for working with validation but the 2 concepts go hand it hand and VueFormulate has done a lovely job combining the two. Also, if you are familiar with validation in Laravel you'll find the validation rules and syntax quite familiar.

---

## Vue Async Computed
[Visit Site](https://github.com/foxbenjaminfox/vue-async-computed)

Ever want to make a computed property async? Yeah, me too! But out of the box, Vue can't handle it. This handy package fixes that. The best part is that it works pretty much as you would expect it to. Just like regular computed properties, async computed properties are only recalculated when their dependencies update. Here's the "Getting Started" kind of example from the repo README:
```vue
<script >
export default {
  data: {
    userId: 1
  },
  asyncComputed: {
    username () {
      return Vue.http.get('/get-username-by-id/' + this.userId)
      .then(response => response.data.username)
    }
  }
}
</script>
```

There are several other features of Vue Async Computed like the ability to know the computation status (updating, error, etc), lazy properties, a shouldUpdate function to further customize its dependencies, and global error handling configuration. It's pretty simple, but an invaluable tool to have around for your next Vue project!

---

## Vue Click Outside
[Visit Site](https://github.com/vue-bulma/click-outside#readme)

Detecting a click on an element in Vue is trivial but detecting a click outside an element can be a bit more of a pain. That all changes once you install Vue Click Outside. Vue Click Outside is a simple custom directive so that you can detect clicks outside the element just as easily as clicks on the element. 
```vue
<template>
  <div>
    <div v-click-outside="hide" @click="toggle">Toggle</div>
    <div v-show="opened">Popup item</div>
  </div>
</template>
```


---

## Vue Split Panel
[Visit Site](https://github.com/bajaniyarohit/vue-split-panel#readme)

![Split Panel Demo](/split-panel.gif)

The last library that I want to share with you today I've admittedly only used in one project, but the experience was very nice (though it's use case limited). If you've ever had a reason to create resizable panels in Vue then Vue Split Panel is for you! You can specify the width (%) of each panel, the direction (vertical or horizontal), the minimum width, and even listen for resize events. 
```vue
<template>
  <Split style="height: 500px;">
    <SplitArea :size="25">
      panel left
    </SplitArea>
    <SplitArea :size="75">
      panel right
    </SplitArea>
  </Split>
</template>
```

## Conclusion
The extensibility of Vue and the great community of talented devs around it have made for a wealth of resources like the ones mentioned here. These are just some of my favorite but there are many others out there that have saved many devs like me time and headaches. Thank you to the devs that create this great software!

Have any Vue or Nuxt libraries you find yourself reaching for on regular occasion? Get the conversation started on Twitter using the link below and share some of your go to Vue libs!
