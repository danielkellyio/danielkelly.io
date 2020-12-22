---
title: Discuss on Twitter Link For Nuxt Content Blog Posts
description: Get your readers talking about your blog posts on Twitter with this simple "Discuss on Twitter" link
publishDate: 2020-12-22 12:00:00
github: https://gist.github.com/danielkellyio/fee9ebe5b08cd0e1b6442ec572da265c
tags:
- Vue
- Nuxt
---
The blog posts on [kentcdodds.com](https://kentcdodds.com/blog) have this nice little link at bottom of each post to "Discuss on Twitter". This approach to talking about a post intrigued me as it allows for readers to interact with the content:
1. In an environment they are used to commenting in
2. And in a way that promotes the discussion amongst followers

To top it off, it's a really simple solution to implement. Let me show you how to pull it off with your Nuxt Content powered blog.

## Demo
<dk-discuss-on-twitter :url="`https://danielkelly.io/blog/discuss-on-twitter`"></dk-discuss-on-twitter>

## Discuss On Twitter Vue Component
The component itself is nothing but a link to twitter with a search query of your blog post url. This will search all of Twitter for mentions of the provided url. This means for every post you publish you should share it on Twitter in order for the "Discuss on Twitter" link to actually pull up results. Of course if your post is getting noticed and others are sharing a link to it on Twitter, their tweets will show up as well (which is great! It's all part of the conversation!).
```vue
// components/global/DiscussOnTwitter.vue
<template>
  <a :href="`https://twitter.com/search?q=${url}`" target="_blank">
      Discuss on Twitter
  </a>
</template>
<script>
export default {
  props: {
    url: { type: String, required: true },
  },
}
</script>
```

### Using It in your Blog Post
At this point using it is just a matter of placing it where you want it and passing it the full url of the blog post being visited.
```vue
// pages/blog/_slug.vue
<template>
  <div>
    <!-- ... Post content -->
    <discuss-on-twitter :url="absoluteUrl" />
  </div>
</template>
<script>
export default{
  // Fetch our post using nuxt content
  async asyncData({ $content, route }) {
    const post = await $content(`blog/${route.params.slug}`).fetch()
    return { post }
  },
  computed: {
    // generate the posts url including protocol, domain, etc
    absoluteUrl() {
      const baseUrl = this.$config.baseUrl
      return `${baseUrl}/blog/${this.post.slug}/`
    },
  },
}
</script>

```

## Increase Engagement by Making it Stand Out
Finally, let's increase engagement with our link by making it stand out a little more. I googled "css speech bubble" and came up with this [little gym of a codepen](https://codepen.io/rikschennink/pen/mjywQb) to quickly bootstrap a speech bubble.

Grab the CSS from the codepen and slightly modify it to fit the styles for our component
```vue
// components/global/DiscussOnTwitter.vue
<style scoped>
.speech-bubble {
  position: relative;

  background-color: #fff;
  padding: 1.125em 1.5em;
  font-size: 1.25em;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
  0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}

.speech-bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100%;
  left: 1.5em;
  border: 0.75rem solid transparent;
  border-top: none;

  border-bottom-color: #fff;
  filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
}
</style>
```

Since I'm using [Tailwind CSS](https://tailwindcss.com/) and [Font Awesome](https://www.npmjs.com/package/nuxt-fontawesome) I can round out the styles with a couple classes and a Twitter icon.
```vue
<template>
  <div class="speech-bubble mt-16">
    <a
      ...
      class="block no-underline text-blue-500"
    >
      <font-awesome-icon :icon="['fab', 'twitter']" />
      Discuss on Twitter
    </a>
  </div>
</template>
```

## Conclusion
A "Discuss on Twitter" link is a simple and effective way to talk about your blog posts. In order to implement it in your Vue/Nuxt project you can copy the full component code from Github [here](https://gist.github.com/danielkellyio/fee9ebe5b08cd0e1b6442ec572da265c). Once you've published your post, don't forget to actually share the post on twitter so there is an initial post to talk about!
