<template>
  <div class="md:flex justify-between">
    <div class="mb-4 text-center">
      <dk-button @click="alert()">Alert</dk-button>
    </div>

    <div class="mb-4 text-center">
      <dk-button @click="prompt()">Prompt</dk-button>
      <div class="mt-2">Answer: {{ answer }}</div>
    </div>

    <div class="mb-4 text-center">
      <dk-button @click="confirm()">Confirm</dk-button>
      <div class="mt-2">Confirmed: {{ confirmed ? 'Yes' : 'No' }}</div>
    </div>
  </div>
</template>
<script>
import dialog from '~/support/dialog'
export default {
  data() {
    return {
      answer: '',
      confirmed: false,
    }
  },
  methods: {
    async alert() {
      await dialog.html().alert('This alert has <strong>rich text</strong>')
    },
    async prompt() {
      this.answer = await dialog
        .title('Pet Survey')
        .okText('Of course!')
        .cancelText('Nope')
        .prompt('Do you like dogs?')
    },
    async confirm() {
      this.confirmed = await dialog
        .okText('Yes')
        .cancelText('No')
        .confirm('Are you sure?')
    },
  },
}
</script>
