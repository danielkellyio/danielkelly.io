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
  filter: grayscale(1) drop-shadow(1px 1px 6px rgba(0, 0, 0, 0.4)) brightness(2);
  width: 100px;
  height: 100px;
  -o-object-fit: contain;
  object-fit: contain;
  -o-object-position: center;
  object-position: center;
  opacity: 1;
  transition: 0.3s ease;
  @apply mr-3;
  @media (max-width: 1032px) {
    filter: grayscale(1);
  }
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
