<template>
  <label :for="id" class="block h-64 relative overflow-hidden rounded">
    <input
      :id="id"
      type="file"
      class="block overlayed"
      :multiple="multiple"
      @change="handleUpload"
    />
    <span
      :class="`overlayed bg-${color}-100 border-${color}-200 border-2 text-${color}-800 pointer-events-none flex justify-center items-center`"
    >
      <div class="text-center">
        <slot>
          <strong :class="`text-${color}-800`">Drag and Drop File</strong>
        </slot>

        <small v-if="files.length" :class="`text-${color}-600 block`">
          <slot name="file" :files="files" :uploadInfo="uploadInfo">
            {{ uploadInfo }}
          </slot>
        </small>
      </div>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    color: { type: String, default: 'gray' },
  },
  data() {
    return {
      files: [],
    }
  },
  computed: {
    uploadInfo() {
      const files = this.files
      return files.length === 1 ? files[0].name : `${files.length} files`
    },
  },
  methods: {
    handleUpload(e) {
      this.files = Array.from(e.target.files) || []
      this.$emit('input', this.files)
    },
  },
}
</script>

<style scoped>
.overlayed {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
}
</style>
