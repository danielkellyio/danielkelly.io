<template>
  <div class="container overflow-x-hidden">
    <h1>Talks</h1>
    <SnazzyList class="flex col-gap-2 flex-wrap" :delay="300">
      <li
        v-for="talk in talks"
        :key="talk.slug"
        class="my-5 shadow md:w-1/3 lg:w-full flex-grow relative"
      >
        <a
          :href="talk.link"
          class="md:hidden absolute top-0 left-0 bottom-0 right-0"
        ></a>
        <a
          :href="talk.link"
          class="lg:flex justify-between block items-center"
          @click.prevent="openVideo(talk)"
        >
          <div class="lg:w-56 w-full order-2 pointer-events-none">
            <div class="embed-container">
              <iframe
                :src="talk.embed"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <div class="p-5 md:w-3/4">
            <div class="text-xl">
              {{ talk.name }}
            </div>
            <p class="italic opacity-50">{{ talk.description }}</p>
          </div>
        </a>
      </li>
    </SnazzyList>
  </div>
</template>

<script>
import dialog from '../support/dialog'
export default {
  async asyncData(ctx) {
    const talks = await ctx.$content('talks').sortBy('slug', 'asc').fetch()
    return { talks }
  },
  methods: {
    openVideo(talk) {
      dialog.html().okText('close')
        .alert(`<div class="video-container"><div class="embed-container">
              <iframe
                src="${talk.embed}"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            </div>`)
    },
  },
}
</script>

<style>
.talks-page .dialog-inner {
  top: 50%;
  transform: translate(-50%, calc(-50% - 65px));
}
@media (min-width: 769px) {
  .video-container {
    width: 739px;
  }
}

.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
