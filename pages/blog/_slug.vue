<template>
  <div class="container overflow-x-hidden">
    <h1>{{ post.title }}</h1>
    <div class="mb-5">
      <h5 class="text-center md:text-left">
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
        <dk-tags
          class="mt-4 justify-center md:justify-start"
          :tags="post.tags"
        />
      </h5>
    </div>

    <div class="relative">
      <div class="sm:absolute" style="bottom: 100%; right: 2px">
        <dk-social-share :url="absoluteUrl" class="justify-center" />
      </div>
      <div class="feature-image-wrapper">
        <img
          class="feature-image mb-10 border-2 border-gray-100 shadow-lg block"
          :src="`/${post.slug}.jpg`"
          :alt="post.title"
          height="446px"
        />
      </div>
    </div>

    <nuxt-content :document="post" class="prose" />
    <dk-discuss-on-twitter :url="absoluteUrl" />
    <dk-related-posts :post="post" :url="absoluteUrl" />
    <dk-newsletter class="mt-10" />
    <dk-surrounding-posts :current-post="post" />
  </div>
</template>
<script>
import { prettyDate } from '~/helper'
import DkRelatedPosts from '~/components/DkRelatedPosts'
import DkSurroundingPosts from '~/components/DkSurroundingPosts'
export default {
  components: {
    DkRelatedPosts,
    DkSurroundingPosts,
  },
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
      return `https://danielkelly.io/blog/${this.post.slug}/`
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
          content: `https://danielkelly.io/${this.post.slug}.jpg`,
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
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@danielkelly_io',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://danielkelly.io/${this.post.slug}.jpg`,
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
.feature-image-wrapper {
  @apply relative;
  transform-origin: top;
  animation: featureImageEnter 1s ease-in;
  object-fit: cover;
  width: 100%;
  padding-top: 57%;
}
.feature-image {
  @apply absolute top-0 bottom-0 left-0 right-0;
  object-fit: cover;
}
</style>
