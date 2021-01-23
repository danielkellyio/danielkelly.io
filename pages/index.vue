<template>
  <div class="h-full overflow-y-hidden overflow-x-hidden">
    <div class="home-wrapper flex">
      <div class="relative z-10">
        <h1
          class="unique relative"
          :class="{
            active: h1Active,
            'with-feature': featureActive,
          }"
        >
          <dk-image
            class="feature absolute lg:hidden"
            src="/ink-2"
            :class="{ active: featureActive }"
          />

          <dk-image
            class="feature absolute hidden lg:block"
            src="/ink-2-desktop"
            :class="{ active: featureActive }"
            sizes="50vw"
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
export default {
  data() {
    return {
      h1Active: true,
      h2Active: true,
      brandsActive: true,
      featureActive: true,
      h1: 'Daniel Kelly',
      h2: 'dad, dev, dabbler',
    }
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

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDownCenteredX {
  from {
    opacity: 0;
    transform: translateY(-40px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.feature {
  animation: fadeInDown 1s ease;
}
h2,
.brands {
  animation: fadeInUp 1.4s ease;
}

h1 {
  font-size: 8rem;
  font-weight: 900;
  color: #555;
  opacity: 1;
  text-shadow: 0 0 20px white, 1px 1px 5px white, -1px -1px 5px white;
}
h1 span {
  mix-blend-mode: hard-light;
}
h2 {
  font-size: 3rem;
  font-weight: 300;
  color: white;
}

h2.active {
  color: var(--pink);

  margin-bottom: 20px;
  background: white;
  padding: 10px 30px;
  border-radius: 35px;
  line-height: 1;
  display: inline-block;
}
@media (min-width: 1031px) {
  h2 {
    margin-top: -20px;
  }
}

.heading-copy {
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

@media (max-width: 1032px) {
  .home-wrapper {
    justify-content: center;
    text-align: center;
  }
  h1 {
    font-size: 4rem;
    line-height: 1;
  }
  h1.with-feature {
    padding-top: 200px;
  }
  h1 span {
    mix-blend-mode: unset !important;
  }
  h2 {
    margin-top: 20px;
    font-size: 2rem;
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
  }
  h2.active {
    margin-top: 20px;
  }
}
.brands {
  will-change: auto;
  transition: 2s ease height;
  height: 200px;
}
@media (max-width: 1032px) {
  .brands {
    justify-content: center;
  }
}
.feature {
  transition: 2s ease;
  height: 700px;
  z-index: -1;
  left: -120px;
  top: -200px;
  max-width: none;
}
@media (max-width: 1032px) {
  .feature {
    transition: 1s ease;
    left: 50%;
    height: 200px;
    animation: fadeInDownCenteredX 1s ease;
    transform: translateX(-50%);
    top: -20px;
    opacity: 1;
  }
}
</style>
