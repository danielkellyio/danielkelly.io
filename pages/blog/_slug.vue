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
}
</script>
