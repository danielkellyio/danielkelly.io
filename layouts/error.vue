<template>
  <div class="container text-center md:text-left">
    <h2 class="hidden md:block" style="font-size: 8rem">404</h2>
    <h1>
      <h2 class="block md:hidden" style="font-size: 8rem">404</h2>
      Page not found
    </h1>
    <nuxt-link to="/">Home Page</nuxt-link>
    <span class="px-2">|</span>
    <nuxt-link to="/">Blog</nuxt-link>
    <span class="px-2">|</span>
    <nuxt-link to="https://github.com/danielkellyio">Github</nuxt-link>
    <span class="px-2">|</span>
    <nuxt-link to="https://twitter.com/danielkelly_io">Twitter</nuxt-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
}
</script>
