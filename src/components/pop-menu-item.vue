<template>
  <a href="#" :class="$style.item" @click.prevent="$emit('click')"
    ><slot>{{ label }}</slot></a
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  emits: {
    click: null,
  },
}
</script>

<style lang="scss" module>
.item {
  display: block;
  padding: 20px 40px;
  color: inherit;
  white-space: nowrap;
  color: #000;
  text-decoration: none;

  &:focus,
  &:hover {
    background: #e5e5e5;
    outline: none;
  }
}
</style>
