---
title: Github Powered Comments for Nuxt Static Sites
description: The Github app "Utterances" enables you to quickly add a github style comments section to your static site in under 10 minutes.
publishDate: 2020-11-29 12:00:00
tags:
    - Vue
    - Javascript
    - Nuxt
---
The Github app "Utterances" enables you to quickly add a github style comments section to your static site in under 10 minutes.

## Utterances Benefits
1. Super quick setup
2. Opensource!
3. Comments support the markdown we're all used to using on github
4. Site visitors can quickly identify themselves and makes comments (caveat being that they already have a github account. This means that Uttrances is best suited for developer focused sites).

## 1. Create a public Github repository
This repo must be public so that others can see and make comments. The repo does NOT have to be the same repo that powers your static site. The repo doesn't have to include any files at all, just create it and done.

## 2. Install the Utterances App in Github
Visit [https://github.com/apps/utterances ](https://github.com/apps/utterances) to install the app and give it access to your repo.

## 3. Configure Utterances
Utterances provides a simple UI here [https://utteranc.es/](https://utteranc.es/) for configuring the comments widget. Configure it to your liking and leave the page open. In the next step we'll reference the script tag generated on this page.

## 4. Create Vue Component
Transfer the attributes in the script tag on the configuration page to the code in the mounted hook below.
```vue
// ~/components/global/comments.vue
<template>
  <div>
    <h6>
      <span>Comments</span>
      <small class="text-xs">Must have a Github account</small>
    </h6>
  </div>
</template>
<script>
export default {
  mounted() {
    const scriptTag = document.createElement('SCRIPT')
    scriptTag.setAttribute('src', 'https://utteranc.es/client.js')
    scriptTag.setAttribute('repo', 'danielkellyio/blog-comments')
    scriptTag.setAttribute('issue-term', 'pathname')
    scriptTag.setAttribute('label', 'Comment')
    scriptTag.setAttribute('theme', 'github-light')
    scriptTag.setAttribute('crossorigin', 'anonymous')
    scriptTag.setAttribute('async', 'async')
    this.$el.append(scriptTag)
  },
}
</script>

<style>
.utterances {
  width: 100%;
  margin: 0 !important;
  max-width: 100%;
}
</style>
```

## 5. Use the Comments Component Wherever You'd Like
Because Nuxt automatically registers components found in the `~/components/global` directory, there's nothing left to do but use our component: `<comments/>`! I told you it'd take less than 10 minutes ;)
