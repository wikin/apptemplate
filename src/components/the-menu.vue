<template>
  <modal-cover v-if="isMenuVisible" @click="$emit('close')" />

  <transition name="menu-transition">
    <nav
      :class="$style.menu"
      v-if="isMenuVisible || $screen.xl"
      @click="$emit('close')"
    >
      <router-link to="/" :active-class="$style.active" exact-active-class="">
        <span>
          <icon-home />
          Home</span
        >
      </router-link>
      <router-link
        to="/team"
        :active-class="$style.active"
        exact-active-class=""
      >
        <span>
          <icon-users />
          Team</span
        >
      </router-link>
      <router-link
        to="/docs"
        :active-class="$style.active"
        exact-active-class=""
      >
        <span>
          <icon-file-text />
          Docs</span
        >
      </router-link>
      <router-link
        v-if="capabilities.setup"
        to="/settings"
        :active-class="$style.active"
        exact-active-class=""
      >
        <span>
          <icon-settings />
          Settings</span
        >
      </router-link>
    </nav>
  </transition>
</template>

<script>
import ModalCover from '@/components/modal-cover'
import user from '@/store/user'
import IconHome from '@svgicons/home'
import IconUsers from '@svgicons/users'
import IconFileText from '@svgicons/file-text'
import IconSettings from '@svgicons/settings'

export default {
  components: {
    ModalCover,
    IconHome,
    IconUsers,
    IconFileText,
    IconSettings,
  },
  props: {
    isMenuVisible: Boolean,
  },
  emits: ['close'],
  setup() {
    const capabilities = user.capabilities
    return { capabilities }
  },
}
</script>

<style lang="scss" module>
@use '@/sass/mixins/breakpoints';

.menu {
  color: #767676;
  background: #ffffff;
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 100;
  font-size: 20px;

  @include breakpoints.up(xl) {
    background: transparent;
    font-size: 12px;
    z-index: 0;
    top: 80px;
    width: 120px;
  }

  a {
    display: block;
    color: #767676;
    text-decoration: none;
    height: 80px;
    display: flex;
    margin: 20px 10px;
    font-weight: 600;

    @include breakpoints.up(xl) {
      width: 80px;
      margin: 34px 20px;
    }

    span {
      flex: 1;
      display: flex;
      align-items: center;
      border-radius: 80px;

      @include breakpoints.up(xl) {
        justify-content: center;
        flex-direction: column;
      }

      svg {
        flex-shrink: 0;
        margin: 0 30px;
        display: block;

        @include breakpoints.up(xl) {
          margin: 5px;
        }
      }
    }

    &:active span,
    &.active span {
      background: #1e7ed6;
      color: #fff;
    }
  }
}

:global .menu-transition {
  &-enter-active,
  &-leave-active {
    transition: transform 0.2s;
  }

  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);

    @include breakpoints.up(xl) {
      transform: translateX(0);
    }
  }
}
</style>
