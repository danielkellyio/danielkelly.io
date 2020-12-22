<template>
  <div class="speech-bubble mt-16">
    <a
      :href="`https://twitter.com/search?q=${url}`"
      target="_blank"
      class="block no-underline text-blue-500"
    >
      <font-awesome-icon :icon="['fab', 'twitter']" />
      Discuss on Twitter
    </a>
  </div>
</template>
<script>
export default {
  props: {
    url: { type: String, required: true },
  },
}
</script>
<style scoped>
.speech-bubble {
  position: relative;

  background-color: #fff;
  padding: 1.125em 1.5em;
  font-size: 1.25em;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
    0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}

.speech-bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  bottom: 100%;
  left: 1.5em;
  border: 0.75rem solid transparent;
  border-top: none;

  border-bottom-color: #fff;
  filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
}
</style>
