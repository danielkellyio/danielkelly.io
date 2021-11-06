<template>
  <div class="container overflow-x-hidden">
    <h1>Courses</h1>
    <SnazzyList class="flex col-gap-2 flex-wrap" :delay="300">
      <li
        v-for="course in courses"
        :key="course.slug"
        class="my-5 shadow md:w-1/3 lg:w-full flex-grow"
      >
        <a
          :href="course.link"
          class="lg:flex justify-between block items-center"
        >
          <img
            :src="course.image"
            :alt="`${course.name} feature image`"
            class="p-4 order-2 block lg:w-48 w-full"
            loading="lazy"
            style="
              background: linear-gradient(0deg, #4f48ad, #1d185e 71.5%);
              aspect-ratio: 1 / 1;
            "
          />

          <div class="p-5">
            <div class="text-xl">
              <img
                src="/vue-school-logo.png"
                alt="Vue School Logo"
                width="30px"
                class="inline"
                style="transform: translateY(5px)"
              />
              {{ course.name }}
            </div>
            <small
              class="italic opacity-50 pl-8 block"
              style="transform: translateY(-5px)"
              >A Vue School Course</small
            >
            <p class="italic opacity-50">{{ course.description }}</p>
          </div>
        </a>
      </li>
    </SnazzyList>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    const courses = await ctx.$content('courses').sortBy('slug', 'asc').fetch()
    return { courses }
  },
}
</script>
