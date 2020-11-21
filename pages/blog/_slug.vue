<template>
  <div class="container">
    <h1>{{ page.title }}</h1>
    <div class="mb-10">
      <h5>
        <span>Daniel Kelly</span>
        <span><span class="text-gray-500">|</span> {{ publishDate }}</span>
        <a v-if="page.github" target="_blank" :href="page.github">
          <span class="text-gray-500">|</span> View On Github</a
        >
      </h5>
    </div>

    <nuxt-content :document="page" class="prose" />

    <div class="flex justify-center mt-16">
      <img src="/ink-2.jpg" alt="ink blob" width="100" />
    </div>
  </div>
</template>
<script>
import { prettyDate } from '~/helper'
export default {
  async asyncData({ $content }) {
    const page = await $content('blog/renderless-vue-dialog').fetch()

    return {
      page,
    }
  },
  computed: {
    publishDate() {
      return prettyDate(this.page.createdAt)
    },
  },
  head() {
    return {
      title: `${this.page.title} | danielkelly.io`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.page.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://danielkelly.io/ink-2.jpg`,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://danielkelly.io/blog/${this.page.slug}`,
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
