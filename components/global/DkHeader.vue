<template>
  <div>
    <div
      class="flex items-center bg-gray-200 p-4 fixed bottom-0 w-full z-20 opacity-75 justify-between flex-row"
    >
      <div class="left block" style="font-size: 1.5rem">
        <router-link to="/">
          <dk-image
            class="mr-2 inline"
            width="40px"
            height="40px"
            src="/logo"
            alt="danielkelly.io"
            sizes="40px"
          />
          danielkelly.io
        </router-link>
      </div>
      <nav class="right">
        <div class="hamburger" @click="menuOpen = !menuOpen">
          <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
        </div>
      </nav>
    </div>
    <transition name="menu-transition">
      <div v-if="menuOpen" class="menu-full-screen text-3xl md:text-5xl">
        <SnazzyList>
          <li v-for="link in links" :key="JSON.stringify(link)" class="mx-1">
            <component
              :is="link.attrs.to ? 'router-link' : 'a'"
              v-bind="link.attrs"
              class="p-3 nav-item whitespace-no-wrap"
              @click="link.click ? link.click() : null"
            >
              <font-awesome-icon v-if="link.icon" :icon="link.icon" />
              <span v-if="link.label">{{ link.label }}</span>
            </component>
          </li>
        </SnazzyList>
      </div>
    </transition>
    <dk-search
      :active="searchActive"
      @close="searchActive = false"
      @open="searchActive = true"
    />
  </div>
</template>

<script>
import DkSearch from '@/components/DkSearch'
export default {
  components: { DkSearch },
  data() {
    return {
      searchActive: false,
      menuOpen: false,
      menuReady: false,
      links: [
        {
          icon: ['fas', 'newspaper'],
          label: 'Blog',
          attrs: {
            to: '/blog',
          },
        },
        {
          icon: ['fas', 'chalkboard-teacher'],
          label: 'Courses',
          attrs: {
            to: '/courses',
          },
        },
        {
          icon: ['fas', 'comment'],
          label: 'Talks',
          attrs: {
            to: '/talks',
          },
        },
        {
          icon: ['fab', 'github'],
          label: 'Github',
          attrs: {
            target: '_blank',
            href: 'https://github.com/danielkellyio',
          },
        },
        {
          icon: ['fab', 'twitter'],
          label: 'Twitter',
          attrs: {
            target: '_blank',
            href: 'https://twitter.com/danielkelly_io',
          },
        },
        {
          icon: ['fas', 'search'],
          label: 'Search',
          click: () => {
            this.searchActive = true
          },
          attrs: {
            title: '"/" to focus',
          },
        },
      ],
    }
  },
  watch: {
    menuOpen() {
      setTimeout(() => {
        this.menuReady = this.menuOpen
      }, 300)
    },
  },
  created() {
    this.$router.afterEach(() => {
      setTimeout(() => (this.menuOpen = false), 1)
    })
  },
}
</script>
<style>
.menu-transition-enter-active,
.menu-transition-leave-active {
  transition: all 0.5s;
}
.menu-transition-enter, .menu-transition-leave-to /* .menu-transition-leave-active below version 2.1.8 */ {
  transform: translateY(100%) translate(50%) scale(0);
  transform-origin: right;
  opacity: 0;
}
</style>
<style scoped>
.menu-full-screen {
  @apply fixed right-0 left-0 bottom-0 bg-white 
    flex justify-center items-center flex-col;
  top: -65px;
  z-index: 19;
  li {
    @apply mb-2;
  }
}
.hamburger {
  font-size: 2rem;
}
li svg {
  font-size: 1.5rem;
  @media (min-width: 769px) {
    font-size: 2.5rem;
  }
}
a {
  transition: 0.3s ease color;
}
li:nth-of-type(even) a {
  @apply text-gray-700;
}
li:nth-of-type(even) a:hover {
  color: var(--pink);
}
li:nth-of-type(odd) a:hover {
  color: var(--blue);
}
</style>
