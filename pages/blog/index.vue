<template>
  <div class="container">
    <h1>Blog</h1>
    <div class="max-w-6xl">
      <ul>
        <li v-for="article in articles" :key="article.slug" class="my-5 shadow">
          <nuxt-link :to="`/blog/${article.slug}`" class="p-5 block">
            <span class="text-lg">{{ article.title }}</span>
            <br />
            <small class="italic">- {{ prettyDate(article.createdAt) }}</small>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { prettyDate } from '@/helper'

export default {
  async asyncData(ctx) {
    const articles = await ctx.$content('blog').sortBy('createdAt').fetch()
    return { articles }
  },
  methods: {
    prettyDate(date) {
      return prettyDate(date)
    },
  },
}
</script>

<style scoped>
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
