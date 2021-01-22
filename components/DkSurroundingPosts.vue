<template>
  <div class="surrounding-posts">
    <div
      v-if="prevPost"
      class="prev-post surrounding-post fixed z-10 shadow-md"
    >
      <nuxt-link class="flex items-center block" :to="`/blog/${prevPost.slug}`">
        <img
          :src="`/${prevPost.slug}.jpg`"
          width="175px"
          :alt="prevPost.title"
        />
        <div class="p-4 text-gray-500">Previous</div>
      </nuxt-link>
    </div>
    <div
      v-if="nextPost"
      class="next-post surrounding-post fixed z-10 shadow-md"
    >
      <nuxt-link class="flex items-center block" :to="`/blog/${nextPost.slug}`">
        <div class="p-4 text-gray-500">Next</div>
        <dk-image
          :src="`/${nextPost.slug}`"
          sizes="175px"
          :alt="nextPost.title"
        />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentPost: { type: Object, required: true },
  },
  async fetch() {
    const surrounding = await this.$content('blog')
      .only(['title', 'slug'])
      .sortBy('publishDate')
      .surround(this.currentPost.slug)
      .fetch()
    this.prevPost = surrounding[0]
    this.nextPost = surrounding[1]
  },
  data() {
    return {
      nextPost: {},
      prevPost: {},
    }
  },
}
</script>
<style scoped>
@keyframes prevEnter {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes nextEnter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.next-post {
  bottom: 200px;
  right: 0;
  animation: nextEnter 2s ease;
  &:hover {
    transform: translateX(10px);
  }
}
.prev-post {
  bottom: 200px;
  left: 0;
  animation: prevEnter 2s ease;
  &:hover {
    transform: translateX(-10px);
  }
}
.surrounding-post {
  transition: 0.3s ease all;
}
@media (max-width: 1500px) {
  .surrounding-posts {
    display: none;
  }
}
</style>
