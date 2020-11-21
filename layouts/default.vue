<template>
  <div>
    <dk-header />
    <Nuxt />
    <Dialog />
  </div>
</template>

<style>
:root {
  --blue: #0d73e0;
  --pink: #ff2bd4;
}

html {
  font-family: 'Work Sans', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  @apply p-10;
  @apply mb-16;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
h1:not(.unique) {
  font-size: 2rem;
  border-bottom: 1px solid var(--pink);
  padding-bottom: 10px;
  margin-bottom: 10px;
  position: relative;
  padding-right: 425px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url('/header.jpg');
    z-index: -1;
    background-position: bottom right;
    width: 410px;
    background-size: 410px;
    background-repeat: no-repeat;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding-right: 0;
    padding-top: 50px;
    &::before {
      top: -40px;
      right: 50%;
      bottom: auto;
      transform: rotate(180deg) translateX(-50%);
      height: 80px;
      width: 110vw;
      background-size: cover;
      background-position: top;
    }
  }
}
p a {
  color: var(--blue) !important;
  text-decoration: underline;
}
.prose {
  max-width: none;
}

h2,
h3 {
  position: relative;
}
h2 a,
h3 a {
  position: absolute;
  background-image: url('/hashtag.webp');
  display: block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  opacity: 0;
  transition: 0.3s ease all;
  top: 50%;
  left: -30px;
  transform: translateY(-50%);
}
h2:hover a,
h3:hover a {
  opacity: 0.5;
}
</style>
