<template>
  <div>
    <div class="home-wrapper flex">
      <video ref="video" class="object-cover" src=""></video>
      <div class="relative z-10">
        <h1 class="unique" :class="{ active: h1Active, dark: h1Dark }">
          {{ h1 }}
        </h1>
        <h2 :class="{ active: h2Active }">{{ h2 }}</h2>
        <div class="heading-copy">
          <h1 :class="{ active: h1Active }">{{ h1 }}</h1>
          <h2 :class="{ active: h2Active }">{{ h2 }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const wait = (callback, timeout) => setTimeout(callback, timeout)
export default {
  data() {
    return {
      h1Active: false,
      h1Dark: false,
      h2Active: false,
      h1: 'Daniel Kelly',
      h2: 'dad, dev, dabbler',
    }
  },
  mounted() {
    const video = this.$refs.video
    video.src = 'https://videos.danielkelly.io/dkio-video-bg.mp4'
    video.playbackRate = 2.0
    video.setAttribute('autoplay', true)
    video.addEventListener('loadstart', () => {
      wait(() => (video.playbackRate = 2.5), 1500)
      wait(() => (this.h1Active = true), 3000)
      wait(() => (this.h1Dark = true), 7000)
      wait(() => (this.h2Active = true), 10000)
    })
  },
}
</script>

<style scoped>
html {
  overflow: hidden;
}

.home-wrapper {
  margin: 0 auto;
  min-height: 100vh;
  align-items: center;
  max-width: 1280px;
}
video {
  position: absolute;
  top: 0;
  left: -25%;
  right: 0;
  bottom: 0;
  min-height: 100vh;
}
h1,
h2 {
  transition: 5s ease all;
  opacity: 0.5;
  color: white;
  border: none !important;
}
h1 {
  font-size: 8rem;
  font-weight: 900;
}
h2 {
  font-size: 3rem;
  font-weight: 300;
  color: white;
}
h1.active,
h2.active {
  opacity: 1;
  text-shadow: 0 0 20px white;
  color: #c2d6d7;
}
h1.dark,
h2.active {
  color: #555;
  //color: #424242;
}

h2.active {
  opacity: 0.8;
  color: var(--pink);
  transform: translateY(-1.5rem);
}

.heading-copy {
  transition: 4s ease all;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(1.1);
  z-index: -1;
  filter: blur(0);
}
.active .heading-copy {
  opacity: 1;
  filter: blur(8px);
}
.heading-copy h1,
.heading-copy h2 {
  color: #a5ddff;
}
.heading-copy h1.active,
.heading-copy h2.active {
  color: white;
}

@media (max-width: 1600px) {
  video {
    min-width: 100vw;
  }
}

@media (max-width: 1032px) {
  .home-wrapper {
    justify-content: center;
    text-align: center;
  }
  h1 {
    font-size: 4rem;
    line-height: 1;
  }
  h2 {
    margin-top: 20px;
    font-size: 2rem;
  }
  video {
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    min-height: 100vh;
  }
}

@media (max-width: 401px) {
  h1 {
    font-size: 3rem;
    padding: 10px;
  }
  h2 {
    margin-top: 0;
    padding: 10px;
    font-size: 1.7rem;
  }
}
</style>
