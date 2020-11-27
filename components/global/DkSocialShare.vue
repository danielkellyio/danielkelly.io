<template>
  <div class="social-share-wrapper flex items-end gap-2">
    <strong class="text-sm text-gray-500 hidden md:block">Share</strong>
    <share-trigger
      class="share-trigger"
      :url="`https://twitter.com/intent/tweet?url=${url}`"
    >
      <font-awesome-icon :icon="['fab', 'twitter']" fixed-width />
    </share-trigger>

    <share-trigger
      class="share-trigger"
      :url="`https://www.facebook.com/sharer/sharer.php?display=popup&u=${url}`"
    >
      <font-awesome-icon :icon="['fab', 'facebook-f']" fixed-width />
    </share-trigger>

    <share-trigger
      class="share-trigger"
      :url="`https://www.linkedin.com/shareArticle?mini=true&url=${url}`"
    >
      <font-awesome-icon :icon="['fab', 'linkedin-in']" fixed-width />
    </share-trigger>
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
@keyframes triggerSettle {
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(50%);
  }
}
.social-share-wrapper {
  height: 4rem;
  overflow: hidden;
  line-height: 1.75rem !important;
}
.share-trigger {
  font-size: 2rem;
  @apply bg-gray-400 text-white p-2 block;
  animation: triggerSettle 0.6s ease-in;
  transition: 0.4s ease all;
  transform: translateY(50%);
  &:hover {
    transform: translateY(0%);
    @apply bg-pink-500;
  }
}
</style>
