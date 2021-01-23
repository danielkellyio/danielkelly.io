<template>
  <img :src="url" :srcset="srcset" />
</template>
<script>
export default {
  props: {
    src: { type: String, required: true },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      breakpoints: [100, 200, 300, 400, 500, 600, 800, 1200, 1600, 2000, 2400],
    }
  },
  computed: {
    publicId() {
      const id = this.src.split('.')[0]
      return `blog/${id}`
    },
    url() {
      return this.cloudinaryUrl()
    },
    srcset() {
      return this.breakpoints
        .map((breakpoint) => {
          return `${this.cloudinaryUrl({
            width: `${breakpoint}`,
          })} ${breakpoint}w`
        })
        .join(',\n')
    },
  },
  methods: {
    cloudinaryUrl(options) {
      return this.$cloudinary.image.url(this.publicId, {
        dpr: 'auto',
        responsive: true,
        crop: 'fill',
        ...this.options,
        ...options,
      })
    },
  },
}
</script>
