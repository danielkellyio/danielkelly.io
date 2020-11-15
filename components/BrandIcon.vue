<template>
  <img :src="`/${brand}.png`" :alt="brand" />
</template>
<script>
export default {
  props: {
    brand: { type: String, required: true },
  },
}
</script>

<style scoped>
img {
  filter: grayscale(1) drop-shadow(10px 10px 20px white);
  width: 100px;
  height: 100px;
  object-fit: contain;
  object-position: center;
  opacity: 0.4;
  transition: 0.3s ease;
  @apply mr-3;
  &:hover {
    opacity: 1;
    filter: grayscale(0) drop-shadow(10px 10px 20px white);
  }
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
}
</style>
