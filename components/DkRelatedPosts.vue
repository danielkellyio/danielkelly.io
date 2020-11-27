<template>
  <div v-if="related.length">
    <h6
      class="mt-10 border-b-2 border-pink-500 text-xl flex justify-center md:justify-between items-end"
    >
      <span class="hidden md:block pb-2">Related Posts</span>
      <dk-social-share :url="url" />
    </h6>
    <dk-posts-list :posts="related" />
  </div>
</template>
<script>
export default {
  props: {
    post: { type: Object, required: true },
    url: { type: String, required: true },
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
