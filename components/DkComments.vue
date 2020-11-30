<template>
  <div v-if="comments.length">
    <h6 class="mt-10 border-b-2 border-pink-500 text-xl">Comments</h6>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="comment p-2 shadow my-2"
    >
      {{ comment.comment }}
    </div>
    <form @submit.prevent="submitWithGithub">
      <textarea
        v-model="newComment"
        class="w-full border-2 border-gray-300 p-2 my-5"
        style="border-width: 1px !important"
        placeholder="New Comment"
      ></textarea>
      <dk-button>Submit Comment</dk-button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      comments: [],
      newComment: '',
    }
  },
  async mounted() {
    const res = await axios.get(
      `http://comments.test/api/comments?url=danielkelly.io${this.$route.fullPath}`
    )
    this.comments = res.data

    if (this.$route.query.code) {
      axios.post('https://github.com/login/oauth/access_token', {
        client_id: '642ce7800785f6a07683',
        client_secret: '59ee52df3ac03249f6aa4fa1113974836c0ceb3d',
        code: this.$route.query.code,
      })
    }
  },
  methods: {
    submitWithGithub() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=642ce7800785f6a07683&redirect_uri=http://localhost:3000${this.$route.fullPath}`
    },
    async handleNewComment() {
      await axios.post(`http://comments.test/api/comments`, {
        author: 'Daniel Kelly',
        comment: this.newComment,
        url: `danielkelly.io${this.$route.fullPath}`,
      })
    },
  },
}
</script>
