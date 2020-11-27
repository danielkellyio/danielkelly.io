<template>
  <div class="container overflow-x-hidden">
    <h1>{{ post.title }}</h1>
    <div class="mb-5">
      <h5 class="">
        <div class="md:flex">
          <div class="mr-2">
            Daniel Kelly <span class="text-gray-500">|</span> {{ publishDate }}
          </div>
          <div v-if="post.github" class="mr-2">
            <a target="_blank" :href="post.github">
              <span class="text-gray-500">|</span> View On Github</a
            >
          </div>
        </div>
        <dk-tags class="mt-4" :tags="post.tags" />
      </h5>
    </div>

    <div class="relative">
      <div class="sm:absolute" style="bottom: 100%; right: 2px">
        <dk-social-share :url="absoluteUrl" class="justify-around" />
      </div>
      <img
        class="feature-image mb-10 border-2 border-gray-100 shadow-lg block"
        :src="`/${post.slug}.jpg`"
        :alt="post.title"
      />
    </div>

    <nuxt-content :document="post" class="prose" />
    <dk-related-posts :post="post" :url="absoluteUrl" />
    <dk-surrounding-posts :current-post="post" />
  </div>
</template>
<script>
import { prettyDate } from '~/helper'
import DkRelatedPosts from '~/components/DkRelatedPosts'
import DkSurroundingPosts from '~/components/DkSurroundingPosts'
export default {
  components: { DkRelatedPosts, DkSurroundingPosts },
  async asyncData({ $content, route }) {
    const slug = route.params.slug
    const post = await $content(`blog/${slug}`).fetch()
    return {
      post,
    }
  },
  computed: {
    publishDate() {
      return prettyDate(this.post.publishDate)
    },
    absoluteUrl() {
      return `https://danielkelly.io/blog/${this.post.slug}`
    },
  },
  head() {
    return {
      title: `${this.post.title} | danielkelly.io`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `/${this.post.slug}.jpg`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.absoluteUrl,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'danielkelly.io',
        },
      ],
    }
  },
}
</script>

<style scoped>
@keyframes featureImageEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.feature-image {
  transform-origin: top;
  animation: featureImageEnter 1s ease-in;
}
</style>
