<template>
  <button class="rounded text-white p-2" @click="$emit('click')">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'DkButton',
}
</script>
<style scoped>
button {
  background: var(--pink);
}
</style>
