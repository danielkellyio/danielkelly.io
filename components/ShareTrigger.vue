<template>
  <a :href="url" rel="noopener" target="_blank" @click.prevent="open">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'GenericShare',
  props: {
    url: { type: String, required: true },
    height: { type: Number, default: 600 },
    width: { type: Number, default: 600 },
  },
  methods: {
    open() {
      const top = Math.ceil(window.outerHeight / 2) - this.height / 2
      const left = Math.ceil(window.outerWidth - this.width / 2 / 2)
      window.open(
        this.url,
        this.url,
        `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${this.width}, height=${this.height}, left=${left}, top=${top}`
      )
    },
  },
}
</script>
