<template>
  <div>
    <h6
      class="mt-10 border-b-2 border-pink-500 text-xl flex justify-between items-baseline"
    >
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
