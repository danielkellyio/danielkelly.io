<template>
  <div
    class="flex items-center bg-gray-200 p-4 fixed bottom-0 w-full z-10 opacity-75 justify-center sm:justify-between flex-col sm:flex-row"
  >
    <div class="left hidden sm:block" style="font-size: 1.5rem">
      <img
        class="mr-2 inline"
        width="40px"
        height="40px"
        src="/logo.png"
        alt="danielkelly.io"
      />danielkelly.io
    </div>
    <nav class="right">
      <ul class="flex">
        <li class="sm:hidden">
          <router-link to="/">
            <img
              class="inline mr-2"
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
            class="p-3 nav-item"
          >
            <font-awesome-icon v-if="link.icon" :icon="link.icon" size="lg" />
            <span v-if="link.label"></span>
          </component>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          icon: ['fas', 'home'],
          attrs: {
            to: '/',
            class: 'hidden sm:inline',
          },
        },
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
