<template>
  <div
    class="bg-blue-300 border-blue-500 border-0 border-l-8 text-white p-2 sm:p-5 my-10"
  >
    <div class="sm:flex items-center">
      <div
        class="pr-5 text-center"
        style="font-size: 1.5rem; font-weight: bold"
      >
        &#9432;
      </div>
      <div>
        <strong v-if="title" class="block text-white">{{ title }}</strong>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
  },
}
</script>
