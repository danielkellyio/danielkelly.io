<template>
  <ul class="tag-wrapper flex">
    <li
      v-for="tag in tags"
      :key="tag"
      class="tag mr-3 bg-gray-100 border-gray-200 rounded px-2"
    >
      {{ tag }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    tags: { type: Array, required: true },
  },
}
</script>
