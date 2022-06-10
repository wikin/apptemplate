<template>
  <div
    :class="$style.cover"
    @click.prevent="$emit('click')"
    :style="{ zIndex: zIndex }"
  ></div>
</template>

<script>
export default {
  emits: ['click'],
  props: {
    zIndex: {
      type: Number,
      default: 100,
    },
  },
}
</script>

<style lang="scss" module>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 0.2;
}
</style>
