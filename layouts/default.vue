<template>
  <div :class="$route.path === '/' ? 'home-page' : ''">
    <dk-header />
    <transition name="home">
      <Nuxt />
    </transition>
    <Dialog />
  </div>
</template>
