<template>
  <div
    ref="wrapper"
    class="wrapper absolute opacity-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center overflow-x-hidden overflow-y-hidden"
  >
    <div class="p-5 relative z-10 text-center">
      <img
        ref="headshot"
        src="/headshot.png"
        alt="daniel kelly headshot"
        class="inline-block"
        width="250"
        style="margin-top: -100px"
      />
      <h1 class="unique relative active with-feature">
        <span class="z-10 inline-block">Daniel Kelly</span>
      </h1>
      <div class="links">
        <a href="https://twitter.com/danielkelly_io">Twitter</a> |
        <a href="https://github.com/danielkellyio">Github</a> |
        <a href="/blog">Blog</a>
      </div>
    </div>
    <video
      ref="video"
      class="object-cover"
      src="https://res.cloudinary.com/djuxgknjk/video/upload/v1628941692/dkio-video-bg_x9t6dy.mp4"
      muted
      playsinline
    ></video>
  </div>
</template>

<script>
// const wait = (callback, timeout) => setTimeout(callback, timeout)
export default {
  data() {
    return {}
  },
  mounted() {
    const video = this.$refs.video
    if (window.innerWidth > 769) {
      video.playbackRate = 1.5
    }

    if (!this.videoIsPlaying(video)) {
      video.play()
    }

    let playbackRateAdjusted = false
    video.addEventListener('loadstart', () => {
      const interval = setInterval(() => {
        if (
          video.currentTime > 2.7 &&
          !playbackRateAdjusted &&
          window.innerWidth > 769
        ) {
          video.playbackRate = 1
          playbackRateAdjusted = true
        }
        if (video.currentTime > 5.6) {
          video.pause()
          clearInterval(interval)
        }
      }, 1)
      // wait(() => (video.playbackRate = 1), 2700)
      // wait(() => video.pause(), 3600)
    })

    this.$refs.headshot.addEventListener('load', () => {
      this.$refs.wrapper.classList.remove('opacity-0')
    })
  },
  methods: {
    videoIsPlaying(video) {
      return !!(
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2
      )
    },
  },
}
</script>
<style scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  width: 100%;
}
.wrapper {
  transition: 0.5s ease opacity;
}
h1 {
  font-size: 8rem;
  font-weight: 900;
  color: #0a4078;
  opacity: 1;
  text-shadow: 0 0 20px white, 1px 1px 5px white, -1px -1px 5px white;
  mix-blend-mode: hard-light;
  line-height: 1;
  margin: 10px 0;
}
@media (max-width: 800px) {
  h1 {
    font-size: 5rem;
  }
}
@media (max-width: 600px) {
  h1 {
    font-size: 3rem;
  }
}
.links {
  display: inline-block;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.5);
  text-shadow: 0 0 10px white, 1px 1px 1px white, -1px -1px 5px white;
}
</style>
