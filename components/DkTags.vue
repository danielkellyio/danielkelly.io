<template>
  <ul class="tag-wrapper flex">
    <li
      v-for="tag in tags"
      :key="tag"
      style="border: 1px solid #bebebe"
      class="tag mr-3 bg-gray-100 border-gray-100 rounded px-2"
    >
      <font-awesome-icon
        class="text-blue-500"
        size="xs"
        :icon="['fas', 'tags']"
      />
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
