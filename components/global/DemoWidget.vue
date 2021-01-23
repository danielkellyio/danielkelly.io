<template>
  <div id="demo-widget" class="border-2 rounded py-4">
    <!-- Demo Widget Header -->
    <div class="flex justify-between align-middle px-4 md:px-8">
      <strong class="text-lg">Demo</strong>
      <div>
        <!--        <span-->
        <!--          class="p-3 cursor-pointer"-->
        <!--          :class="{ active: mode === 'output' }"-->
        <!--          @click="mode = 'output'"-->
        <!--          >-->
        <!--          Output-->
        <!--        </span>-->
        <!--        <span-->
        <!--          class="p-3 cursor-pointer"-->
        <!--          :class="{ active: mode === 'code' }"-->
        <!--          @click="mode = 'code'"-->
        <!--          >Code</span-->
        <!--        >-->
      </div>
    </div>
    <hr class="mx-0 my-4" />

    <!-- Demo Widget Content -->
    <div class="px-4 md:px-8">
      <LazyHydrate when-visible>
        <component :is="BlogPostExample" :mode="mode"></component>
      </LazyHydrate>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DemoWidget',
  props: {
    slug: { type: String, required: true },
  },
  data() {
    return {
      mode: 'output',
      code: '',
    }
  },
  computed: {
    BlogPostExample() {
      return () => import(`~/components/blog-post-demos/${this.slug}`)
    },
  },
}
</script>

<style scoped>
.active {
  @apply bg-gray-200 rounded;
}
</style>
