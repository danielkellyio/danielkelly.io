<template>
  <div>
    <SnazzyList class="flex col-gap-2 flex-wrap" :delay="300">
      <li
        v-for="post in posts"
        :key="post.slug"
        class="my-5 shadow md:w-1/3 lg:w-full flex-grow"
      >
        <nuxt-link
          :to="`/blog/${post.slug}`"
          class="lg:flex justify-between block"
        >
          <dk-image
            :src="post.slug"
            loading="lazy"
            :alt="post.title"
            class="w-full order-2 block"
            sizes="(max-width: 1024px) 90vw, 200px"
          />

          <div class="p-5">
            <div class="text-xl">{{ post.title }}</div>
            <p class="italic opacity-50">
              - {{ prettyDate(post.publishDate) }}
            </p>
          </div>
        </nuxt-link>
      </li>
    </SnazzyList>
  </div>
</template>
<script>
import { prettyDate } from '@/helper'
import DkImage from './DkImage.vue'

export default {
  components: { DkImage },
  props: {
    posts: { type: Array, required: true },
  },
  methods: {
    prettyDate(date) {
      return prettyDate(date)
    },
  },
}
</script>

<style scoped>
@media (min-width: 1024px) {
  img {
    width: 200px !important;
  }
}
li {
  position: relative;
  transition: 0.5s;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    display: block;
    width: 1px;
    background: var(--blue);
    transition: 1s ease all;
    z-index: -1;
    will-change: auto;
  }
  &:nth-of-type(even) {
    &::before {
      background: var(--pink);
      width: 2px;
    }
  }
  &:hover {
    color: white;
    &:before {
      opacity: 0.7;
      width: 100%;
    }
  }
}
</style>
