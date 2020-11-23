<template>
  <div class="">
    <div class="mb-4">
      <pre>
await dialog.html().alert('This alert has &lt;strong&gt;rich text&lt;/strong&gt;')</pre
      >
      <dk-button @click="alert()">Alert</dk-button>
    </div>

    <div class="mb-4">
      <pre>
this.answer = await dialog
.title('Pet Survey')
.prompt("What's your pet's name?")
      </pre>
      <dk-button @click="prompt()">Prompt</dk-button>
      <div class="mt-2">Answer: {{ answer }}</div>
    </div>

    <div class="mb-4">
      <pre>
this.confirmed = await dialog
.okText('Yes')
.cancelText('No')
.confirm('Are you sure?')
      </pre>
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
        .prompt("What's your pet's name?")
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
