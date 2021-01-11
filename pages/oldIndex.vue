<template>
  <div class="h-full overflow-y-hidden">
    <div class="home-wrapper flex">
      <video
        ref="video"
        class="object-cover"
        src="https://videos.danielkelly.io/dkio-video-bg.mp4"
        autoplay
        muted
        playsinline
        :class="{ 'opacity-0': videoHidden }"
      ></video>
      <div class="relative z-10">
        <h1
          class="unique relative"
          :class="{
            active: h1Active,
            dark: h1Dark,
            'with-feature': featureActive,
          }"
        >
          <img
            class="feature absolute lg:hidden"
            src="/ink-2.jpg"
            :class="{ active: featureActive }"
          />
          <img
            class="feature absolute hidden lg:block"
            src="/ink-2-desktop.jpg"
            :class="{ active: featureActive }"
          />
          <span class="z-10 inline-block">
            {{ h1 }}
          </span>
        </h1>
        <h2 :class="{ active: h2Active }">{{ h2 }}</h2>
        <div class="heading-copy">
          <h1 :class="{ active: h1Active }">{{ h1 }}</h1>
          <h2 :class="{ active: h2Active }">{{ h2 }}</h2>
        </div>
        <div
          class="brands flex"
          :class="{ active: brandsActive }"
          style="font-size: 4rem"
        >
          <brand-icon brand="vue" />
          <brand-icon brand="laravel" />
          <brand-icon brand="nuxt" />
          <brand-icon brand="git" />
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
      brandsActive: false,
      videoHidden: false,
      featureActive: false,
      h1: 'Daniel Kelly',
      h2: 'dad, dev, dabbler',
    }
  },
  mounted() {
    const video = this.$refs.video
    video.playbackRate = 2.0
    video.addEventListener('loadstart', () => {
      wait(() => (video.playbackRate = 2.5), 1500)
      wait(() => (this.h1Active = true), 2500)
      wait(() => (this.h1Dark = true), 4500)
      wait(() => (this.brandsActive = true), 4500)
      wait(() => (this.h2Active = true), 5000)
      wait(() => (this.videoHidden = true), 4000)
      wait(() => (this.featureActive = true), 5000)
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
  @media (max-width: 1280px) {
    max-width: 900px;
  }
}
video {
  position: absolute;
  top: 0;
  left: -25%;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  transition: 2s ease all;
}
h1,
h2 {
  transition: 3s ease all;
  opacity: 0.5;
  color: white;
  border: none !important;
}
h2 {
  transition: 2s ease color, background;
}
h1 {
  font-size: 8rem;
  font-weight: 900;
  span {
    mix-blend-mode: hard-light;
  }
}
h2 {
  font-size: 3rem;
  font-weight: 300;
  color: white;
}
h1.active,
h2.active {
  opacity: 1;
  text-shadow: 0 0 20px white, 1px 1px 5px white, -1px -1px 5px white;
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
  background: white;
  padding: 5px 30px;
  border-radius: 35px;
  line-height: 1;
  display: inline-block;
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
    &.with-feature {
      padding-top: 200px;
    }
    span {
      mix-blend-mode: unset !important;
    }
  }
  h2 {
    margin-top: 20px;
    font-size: 2rem;
  }
  /*video {
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    min-height: 100vh;
  } */
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
    &.active {
      margin-top: 20px;
    }
  }
}
.brands {
  overflow: hidden;
  will-change: auto;
  transition: 2s ease height;
  height: 0;
  &.active {
    height: 200px;
  }
  @media (max-width: 1032px) {
    justify-content: center;
  }
}
.feature {
  opacity: 0;
  transition: 2s ease;
  height: 700px;
  z-index: -1;
  left: -120px;
  top: -200px;
  max-width: none;
  &.active {
    opacity: 1;
  }
  @media (max-width: 1032px) {
    transition: 1s ease;
    top: -220px;
    left: 50%;
    height: 200px;
    transform: translateX(-50%);
    &.active {
      top: -20px;
      opacity: 1;
    }
  }
}
</style>
