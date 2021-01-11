<template>
  <div>
    <div
      class="flex items-center bg-gray-200 p-4 fixed bottom-0 w-full z-20 opacity-75 justify-center sm:justify-between flex-col sm:flex-row"
    >
      <div class="left hidden sm:block" style="font-size: 1.5rem">
        <router-link to="/">
          <img
            class="mr-2 inline"
            width="40px"
            height="40px"
            src="/logo.png"
            alt="danielkelly.io"
          />danielkelly.io
        </router-link>
      </div>
      <nav class="right">
        <ul class="flex">
          <li class="sm:hidden w-12">
            <router-link to="/">
              <img
                class="inline"
                width="40px"
                height="40px"
                src="/logo.png"
                alt="danielkelly.io"
              />
            </router-link>
          </li>
          <li v-for="link in links" :key="JSON.stringify(link)" class="mx-1">
            <component
              :is="link.attrs.to ? 'router-link' : 'a'"
              v-bind="link.attrs"
              class="p-3 nav-item whitespace-no-wrap"
              @click="link.click ? link.click() : null"
            >
              <font-awesome-icon v-if="link.icon" :icon="link.icon" size="lg" />
              <span v-if="link.label"></span>
            </component>
          </li>
        </ul>
      </nav>
    </div>
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
      links: [
        {
          icon: ['fab', 'github'],
          attrs: {
            target: '_blank',
            href: 'https://github.com/danielkellyio',
          },
        },
        {
          icon: ['fab', 'twitter'],
          attrs: {
            target: '_blank',
            href: 'https://twitter.com/danielkelly_io',
          },
        },
        {
          icon: ['fas', 'newspaper'],
          attrs: {
            to: '/blog',
          },
        },
        {
          icon: ['fas', 'search'],
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
}
</script>
<style scoped>
li svg {
  font-size: 2.5rem;
}
a {
  transition: 0.3s ease color;
}
li:nth-of-type(even) a:hover {
  color: var(--pink);
}
li:nth-of-type(odd) a:hover {
  color: var(--blue);
}
</style>
