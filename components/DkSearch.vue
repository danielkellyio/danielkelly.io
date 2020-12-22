<template>
  <transition name="fade">
    <div
      v-if="active"
      class="search fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-30"
    >
      <div
        class="search-overlay absolute top-0 left-0 right-0 bottom-0 bg-gray-800"
        style="opacity: 0.9"
        @click="$emit('close')"
      ></div>
      <div
        class="search-inner z-30 mx-5 relative"
        style="width: 600px; max-width: 100%; margin-top: -200px"
      >
        <font-awesome-icon
          :icon="['fas', 'search']"
          size="lg"
          class="absolute text-gray-400"
          style="
            top: 50%;
            transform: translateY(-50%);
            left: 12px;
            font-size: 1.8rem;
          "
        />
        <ais-instant-search :search-client="searchClient" index-name="blog">
          <ais-autocomplete>
            <div slot-scope="{ currentRefinement, indices, refine }">
              <input
                ref="searchInput"
                v-model="query"
                type="search"
                class="rounded p-6 pl-12 text-lg w-full"
                placeholder="Search"
                @input="refine(query)"
              />
              <div v-if="currentRefinement" class="relative">
                <ul
                  v-for="index in indices"
                  :key="index.label"
                  class="search-results absolute bg-white w-full p-5 overflow-y-auto"
                  :class="{
                    'h-64': index.hits.length > 1,
                  }"
                >
                  <li>
                    <h3>{{ index.label }}</h3>
                    <ul
                      v-if="index.hits.length"
                      :class="{
                        'pb-5': index.hits.length > 1,
                      }"
                    >
                      <li
                        v-for="hit in index.hits"
                        :key="hit.objectID"
                        class="hover:bg-gray-300 p-3"
                      >
                        <a
                          :href="`/blog/${hit.objectID}`"
                          class="inline-flex gap-5 items-center"
                          @click="$emit('close')"
                        >
                          <img
                            :src="`/${hit.objectID}.jpg`"
                            :alt="hit.title"
                            class="w-1/4"
                          />
                          <div>
                            <ais-highlight attribute="title" :hit="hit" />
                            <div
                              class="text-gray-500"
                              style="font-size: 0.6rem"
                            >
                              <ais-highlight
                                attribute="description"
                                :hit="hit"
                                class="text-xs"
                              />
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div v-else class="italic text-gray-800">
                      No results found
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ais-autocomplete>
        </ais-instant-search>
      </div>
    </div>
  </transition>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'

export default {
  props: {
    active: { type: Boolean, default: false },
  },
  data() {
    return {
      query: '',
      searchClient: algoliasearch(
        this.$config.algoliaAppId,
        this.$config.algoliaSearchOnlyApiKey
      ),
    }
  },
  watch: {
    active(active) {
      this.query = ''
      if (active) {
        setTimeout(() => this.$refs.searchInput.focus(), 400)
      }
    },
  },
  mounted() {
    document.body.addEventListener('keypress', (e) => {
      if (e.key === '/') {
        e.preventDefault()
        this.$emit(this.active ? 'close' : 'open')
      }
    })
  },
}
</script>

<style>
.ais-Highlight-highlighted {
  background: var(--pink);
  color: white;
  @apply px-1;
}
.search-inner {
  transition: all 0.5s ease;
  transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter .search-inner,
.fade-leave-to .search-inner {
  transform: translateY(-150px);
}
</style>
