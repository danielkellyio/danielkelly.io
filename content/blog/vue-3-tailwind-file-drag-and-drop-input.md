---
title: 'Vue Composition API + Tailwind File Drag and Drop'
description: 'Create a simple drag and drop file input using the Vue 3 Composition API and use Tailwind css to make it shine with ease.'
publishDate: 2021-01-20 12:00:00
github: null
tags:
  - Vue
  - Tailwind
---

Maybe you're like me and haven't really gotten a chance to try out the new Composition API in Vue. Well, we're both in luck as this little blog post has given us both that chance! Today we'll utilize the Composition API (along with Tailwind CSS) to build a file drag and drop input.

## Component Interface
We're going to build our component so that it can be used like so:
```vue
<file-drag-and-drop id="my-file" color="red" multiple>
```

## The Template and Styles

```vue
<template>
  <!-- We wrap the whole thing in a label so that the whole area can be clickable -->
  <label :for="id" class="block h-64 relative overflow-hidden rounded">
    <!-- 
    * The input has an "overlayed" class which we define using @apply in the style block below
    * This ensures that no matter where you drag inside of the "drop zone" the default browser behavior for file inputs will kick in and assign that file(s) to the input
    * If we didn't do this the browser would instead just attempt to open the file in the window
    -->
    <input
      :id="id"
      type="file"
      class="overlayed"
      :multiple="multiple"
      @change="handleUpload"
    />
    <!-- This is where we do the fancy styling with Tailwind CSS and transform this thing from a normal file input to a nicely styled drag and drop dropzone-->
    <span
      :class="`overlayed bg-${color}-100 border-${color}-200 border-2 text-${color}-800 pointer-events-none flex justify-center items-center`"
    >
      <div class="text-center">
        <!-- Let's use a slot here to make our component a little more flexible (maybe end developer would live to add an icon in there, etc) -->
        <slot>
          <strong>Upload File</strong>
        </slot>

        <!-- 
        * Print out the file name so the user gets the feedback that the input accepted the file appropriately 
        * This is really the only part that relies on Vue, 
        the actual drag and drop functionality is handled by the default browser behavior for the input. 
        This puts the majority of the functionality on the browser which is great! 
        That means we don't have to mess with it
        -->
        <small v-if="files.length" :class="`text-${color}-600 block`">
          <slot name="file" :files="files" :uploadInfo="uploadInfo">
            {{ uploadInfo }}
          </slot>
        </small>
      </div>
    </span>
  </label>
</template>

<style scoped>
/* Finally we use Tailwind CSS to create our overlayed class */
.overlayed {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
}
</style>
```

## Vue Composition API

Now let's add the Vue Composition API so that we can properly show the user the filename of the file they uploaded.

```vue
<script>
import { ref, computed } from 'vue'
export default {
  // props seem best defined in the Object API style as we're used to
  props: {
    id: { type: String, default: 'drag-and-drop-input' },
    multiple: { type: Boolean, default: false },
    color: { type: String, default: 'blue' },
  },
  // Everything else goes in a setup function
  setup(props, { emit }) {
    // keep up with the files state (think data)
    const files = ref([])

    // display the uploaded file names (think computed)
    const uploadInfo = computed(() => {
      return files.value.length === 1
        ? files.value[0].name
        : `${files.value.length} files selected`
    })

    // handle the file upload event (think methods)
    const handleUpload = (e) => {
      files.value = Array.from(e.target.files) || []
      emit('input', files)
    }

    return { files, uploadInfo, handleUpload }
  },
}
</script>
```

Alright now that you've got an eyeful of the entire thing, let's break it down and take a look at some of the new syntax that the Composition API brings to the table.

### setup(props, ctx)

The setup function takes 2 arguments: props and context. Props is simple. It a reference to the values given your props. In our case with the just the prop defaults it would look like this:

```javascript
{
  color: "blue"
  id: "drag-and-drop-input"
​​​  multiple: true
}
```

The context agument (sometimes abbreviated ctx) gives us access to a larger component context than just the props. It provides access to an `emit` and `expose` method, `attrs`, `slots`, and `props` (same as argument 1). If we only need a piece of the context we can desctructure it in the setup method declaration as we've done with `{ emit }`

### ref()

```javascript
const files = ref([])
```

The first thing we do in our setup function is define the state of our files. You can imagine this in the Object API as being one of the properties in the object returned by the data method. The simplicity here is refreshing. `files` is just a variable and **the `ref()` method makes `files` reactive**.

There is one caveat with ref. Instead of accessing `files` with `this.files` as in the Object API, we now use `files.value`. The `.value` portion does seem a little annoying at first but I've read that it doesn't take long until it becomes second nature. Not to mention, it's necessary in order for the variable to be passed by reference (and thus be reactive).

## computed()

```javascript
const uploadInfo = computed(() => {
  return files.value.length === 1
    ? files.value[0].name
    : `${files.value.length} files selected`
})
```

The next piece of code uses the `computed()` function to create a computed property. This compares one-to-one with the `computed` property in the Object API. The function simply takes a callback function that's run to determine the value of the computed property. Just like the Object API, it keeps track of it's dependencies and automatically updates accordingly. For the drag and drop input, it's computing the filename output. If the user only drags in 1 file it will show the file name. If the user drags in more than 1, it will show a message about how many files were provided.

## A method

```javascript
const handleUpload = (e) => {
  files.value = Array.from(e.target.files) || []
  emit('input', files)
}
```

The code above responds to the `onchange` event of the file input and just sets our local `files` state to the files provided by the user. This compares to a function in the `methods` section of the Object API. Notice how we set the files using `files.value`.

## Exposing Variables to the Template

```javascript
return { files, uploadInfo, handleUpload }
```

Finally, in order for our data, computed prop, and method to be available to the template we have to return them from the setup function. This is easily done using ES6 object property value shorthand.

## Demo
