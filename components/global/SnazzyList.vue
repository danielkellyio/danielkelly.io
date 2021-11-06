<template>
  <ul v-if="showing" class="snazzy-list">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  props: {
    delay: { type: Number, default: 200 },
    show: { type: Boolean, default: true },
  },
  data() {
    return {
      showing: true,
      items: [],
    }
  },
  watch: {
    show() {
      setTimeout(
        () => {
          this.showing = this.show
          if (this.show) this.enter()
          if (!this.show) this.leave()
        },
        !this.show ? this.items.length * this.delay : 1
      )
    },
  },
  mounted() {
    this.items = this.$el.querySelectorAll('li')
    this.enter()
  },
  methods: {
    enter() {
      this.items = this.$el.querySelectorAll('li')
      this.items.forEach((item, index) => {
        setTimeout(() => {
          this.$nextTick(() => {
            item.classList.add('snazzy-list-shown')
          })
        }, (index + 1) * this.delay)
      })
    },
    leave() {
      this.items = this.$el.querySelectorAll('li')
      this.items.forEach((item, index) => {
        setTimeout(() => {
          this.$nextTick(() => item.classList.remove('snazzy-list-shown'))
        }, index * this.delay)
      })
    },
  },
}
</script>
<style>
.snazzy-list > li {
  transition: 1s ease all;
  transform: translateX(-20px);
  opacity: 0;
}
.snazzy-list .snazzy-list-shown {
  transform: translateX(0);
  opacity: 1;
}
</style>
