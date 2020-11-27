<template>
  <div class="container overflow-x-hidden">
    <h1>{{ post.title }}</h1>
    <div class="mb-10">
      <h5 class="md:flex justify-between items-center">
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
        <dk-tags class="mt-2 md:mt-0" :tags="post.tags" />
      </h5>
    </div>

    <img
      class="mb-10 border-2 border-gray-100 shadow-lg"
      :src="`/${post.slug}.jpg`"
      :alt="post.title"
    />

    <nuxt-content :document="post" class="prose" />
    <dk-related-posts :post="post" />
  </div>
</template>
<script>
import { prettyDate } from '~/helper'
import DkRelatedPosts from '~/components/DkRelatedPosts'
export default {
  components: { DkRelatedPosts },
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
          content: `https://danielkelly.io/blog/${this.post.slug}`,
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
