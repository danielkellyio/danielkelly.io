<template>
  <div class="container overflow-x-hidden">
    <h1>Blog</h1>
    <div class="max-w-6xl">
      <dk-posts-list :posts="posts" />
    </div>
  </div>
</template>

<script>
import { prettyDate } from '@/helper'
import DkNewsletter from '@/components/DkNewsletter'
export default {
  components: { DkNewsletter },
  async asyncData(ctx) {
    const posts = await ctx
      .$content('blog')
      .sortBy('publishDate', 'desc')
      .fetch()
    return { posts }
  },
  methods: {
    prettyDate(date) {
      return prettyDate(date)
    },
  },
}
</script>
