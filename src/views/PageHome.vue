<template>
  <the-view title="Home">
    <div :class="$style.home"></div>
  </the-view>
</template>

<script>
import TheView from '@/components/the-view'

export default {
  components: {
    TheView,
  },
}
</script>

<style lang="scss" module>
.home {
  height: 1500px;
  text-align: center;
}
</style>
