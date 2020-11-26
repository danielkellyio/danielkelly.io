---
title: State Management with Vue Observable
description: `Vue.observable()` is better than Vuex for keeping up with reactive state in Vue.
---

`Vue.observable()` is a great way to keep up with reactive state in Vue. "Maybe" you think, "but what about Vuex"? I've used Vuex for a few production level products and yes it does its job, but writing it is simply no fun. It's overly verbose, doesn't play nicely with my IDE, and more. 

## Vue Observable Benefits
So what does `Vue.observable()` provide that Vuex does not?
1. It's less verbose
2. No useless actions vs mutations distinction
    * (and don't have to remember which method to call (dispatch or commit))
3. No magic strings
    * ie calling mutations with commit('functionIdentifiedByString')
4. Plain old method calls makes my IDE happy
    * My IDE can easily jump to or autocomplete `store.increment()` but not `store.dispatch('increment')`
5. Getters are just plain JS getters (no new concepts to learn)
6. State "modules" are just regular ES6 modules (no new concepts to learn)
7. No need for any extra libraries

## An Example of Vue.observable for State Management
Let's pretend we're making a blog. Our store might looking something like this:
```javascript
//store.js
import Vue from 'vue'
import axios from 'axios'

// Make your state a private variable only available to your current file (module)
const state = Vue.observable({
    posts:[],
    lastPage: null,
    firstPage: 1,
    total: null
})

export default {
    // make state a getter here to provide access to the private state variable above
    // only allow getting so that it cannot be modified without calling a mutation method
    get state(){ return state },

    // mutations
    async getPosts(page){
        try{
            const res = await axios.get(`https://blog-post-api.com/posts/${page}`)
            state.posts = res.data
            state.lastPage = res.last_page
            state.firstPage = res.first_page
            state.total = res.total
        }catch(error){ /*Notify user of error*/ }
    },

    async updatePost(post){
        try{
            const res = await axios.put(`https://blog-post-api.com/posts`)
            state.posts = state.posts.map(p=>{
                if(p.id === post.id ) p = post
                return p
            })
        }catch(error){ /*Notify user of error*/ }
    },
    
    async deletePost(postId){
        try{
            const res = await axios.delete(`https://blog-post-api.com/posts/${postId}`)
            state.posts = state.posts.filter(post => post.id !== postId)
            state.total--
            state.posts.push(post)
        }catch(error){ /*Notify user of error*/ }
    },

    // etc
}
```

Then using it in our vue templates could look something like this:
```vue
<template>
<div>
    <ul>
        <li v-for="post in posts">
          {{post.title}} 
          <button @click="store.updatePost(post)">Update Post</button>
          <button @click="store.deletePost(post.id)">Delete Post</button>
        </li>
    </ul>
</div>
</template>
<script>
import store from './store'
export default{
  data(){ return store },
  computed:{
    posts(){ return store.state.posts }
  },
  created(){
    store.getPosts()
  }
}
</script>
```

## Vuex vs Vue.observable()
Let's compare the 2 with an example from [the official Vuex website](https://vuex.vuejs.org).

#### Vuex
```javascript
// copied from Vuex docs here: https://vuex.vuejs.org/guide/actions.html
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// defining store
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
          state.count++
        }
    },

    // not absolutely necessary for this example but if async is needed it would be (this comment is my own)
    actions: {
        increment (context) {
          context.commit('increment')
        }
    }
})

// using store
store.dispatch('increment')
```

I know the example above may not be completely fair because it does not necessarily need an action since it's not async. However, most of your state mutations probably will occur asyncronously and the above will be necessary in those instances. Even for syncronous mutations though, it is often considered best practice to create an action for it and only call `dispatch` from your .vue files. The Vue.observable example below shows how you can avoid that action/mutation distinction all together.

#### Vue.observable()
```javascript
import Vue from 'vue'

// defining store
const state = Vue.observable({
    count: 0
})

const store = new Vuex.Store({
    get state(){ return state },
    // always define method as async so that code in .vue files doesn't have to be changed if the mutation's business requirements change so that it must be async
    // (actual method code can be async or sync) 
    async increment () { state.count++ }
})

// using store
// is it dispatch or commit, I can't remember... 
// oh yeah it's neither. Just call the method I actually want to call
store.increment()
```

## Vue.observable() Getters
```javascript
// rewrite of getters example from vuex website using Vue.observable instead
// (https://vuex.vuejs.org/guide/getters.html#property-style-access)
const state = Vue.observable({
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
})
export default {
    get state(){ return state },
    
    // regular old js getter (no need to nest under some special getters prop)
    get doneTodos(){
        return state.todos.filter(todo => todo.done)
    }
}
```

## Vue.observable() Modules
```javascript
// rewrite of mutations example from vuex website using Vue.observable instead
// (https://vuex.vuejs.org/guide/modules.html)

// definitions

// store/a.js
const state = Vue.observable({})
export default{  /* ... */ }

// store/b.js
const state = Vue.observable({})
export default{  /* ... */ }

// use
import a from 'store/a'
import b from 'store/b'
```

This means our blog example from above could become a store module like so:
```javascript
// store/posts.js
import Vue from 'vue'
import axios from 'axios'
const state = Vue.observable({/*...*/})

export default {
    get state(){ return state },

    // mutations
    async get(page){/*...*/},

    async update(post){/*...*/},
    
    async delete(postId){/*...*/},
}
```
Then using it would look more like this:
```vue
<template>
<div>
    <ul>
        <li v-for="post in posts">
          {{post.title}} 
          <button @click="ps.update(post)">Update Post</button>
          <button @click="ps.delete(post.id)">Delete Post</button>
        </li>
    </ul>
</div>
</template>
<script>
import ps from './store/posts'
export default{
  data(){ return ps },
  computed:{
    posts(){ return ps.state.posts }
  },
  created(){
    ps.get()
  }
}
</script>
```

## Conclusion
In my experience Vuex is overly complex/verbose, inventing concepts that are more confusing than helpful. If you're used to using Vuex and work on a team that's experienced in it, I wouldn't change anything. However, if you're beginning a new project or on a team that's maybe less experienced in Vuex, I think the `Vue.observable` approach is worth a try. I myself am no Vuex expert and perhaps there are some other problems Vuex addresses that `Vue.observable()` does not, but I haven't run into one yet!
