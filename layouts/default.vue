<template>
  <div :class="$route.path === '/' ? 'home-page' : ''">
    <dk-header />
    <Nuxt />
    <Dialog />
  </div>
</template>
<script>
export default {
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter(el) {
      console.log('Before enter...')
    },
  },
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter,
.page-leave-active {
  filter: grayscale(0.2) blur(5px);
  opacity: 0;
}
</style>
