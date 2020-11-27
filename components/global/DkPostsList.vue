<template>
  <ul class="sm:flex lg:block gap-2">
    <li v-for="post in posts" :key="post.slug" class="my-5 shadow">
      <nuxt-link
        :to="`/blog/${post.slug}`"
        class="lg:flex justify-between block"
      >
        <img
          class="w-full order-2"
          :src="`/${post.slug}.jpg`"
          :alt="post.title"
        />
        <div class="p-5">
          <div class="text-lg">{{ post.title }}</div>
          <small class="italic"> - {{ prettyDate(post.publishDate) }} </small>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import { prettyDate } from '@/helper'

export default {
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
