<template>
  <div v-if="related.length">
    <h6 class="mt-10 border-b-2 pb-2 border-pink-500 text-xl">Related Posts</h6>
    <dk-posts-list :posts="related" />
  </div>
</template>
<script>
export default {
  props: {
    post: { type: Object, required: true },
  },
  async fetch() {
    this.related = await this.$content('blog')
      .where({
        tags: { $containsAny: this.post.tags },
        slug: { $ne: this.post.slug },
      })
      .fetch()
  },
  data() {
    return {
      related: [],
    }
  },
}
</script>
