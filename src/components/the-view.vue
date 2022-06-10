<template>
  <title>{{ title }}</title>
  <the-header @open-menu="isMenuVisible = true" :title="title" />
  <the-menu :isMenuVisible="isMenuVisible" @close="isMenuVisible = false" />
  <main :class="$style.main">
    <div :class="$style.in">
      <h1 v-if="$screen.xl">{{ title }}</h1>
      <slot />
    </div>
  </main>
</template>

<script>
import TheMenu from '@/components/the-menu'
import TheHeader from '@/components/the-header'

import { ref } from 'vue'

export default {
  components: {
    TheMenu,
    TheHeader,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isMenuVisible = ref(false)

    return { isMenuVisible }
  },
}
</script>
<style lang="scss" module>
@use '@/sass/mixins/breakpoints';

.main {
  padding: 60px 20px 20px 20px;

  @include breakpoints.up(xl) {
    padding: 30px;
    top: 80px;
    bottom: 0;
    left: 120px;
    right: 0;
    position: fixed;
    overflow: auto;
  }

  @include breakpoints.up(xxl) {
    padding-top: 60px;
  }

  .in {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    font-size: 34px;
    font-weight: 800;
    margin: 0;

    @include breakpoints.up(xxl) {
      font-size: 40px;
    }
  }
}

:global(#nprogress) {
  pointer-events: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0;
  z-index: 1031;
  height: 2px;
  overflow: hidden;

  :global(.bar) {
    background: #1e7ed6;
    position: absolute;
    width: 100%;
    height: 2px;
  }
}
</style>
