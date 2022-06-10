<template>
  <header :class="$style.header">
    <div :class="$style.left">
      <a href="" @click.prevent="$emit('open-menu')" v-if="!$screen.xl">
        <icon-menu />
      </a>

      <div :class="$style.title" v-if="!$screen.xl">{{ title }}</div>
    </div>
    <div :class="$style.right">
      <pop-menu :class="$style.profile">
        <div :class="$style.avatar">{{ initials }}</div>
        <template v-if="$screen.md">
          {{ fullName }}<icon-chevron-down :size="20" :class="$style.chevron" />
        </template>
        <template #header>
          <div :class="$style.profile">
            <div :class="$style.avatar">{{ initials }}</div>
            {{ fullName }}
          </div>
        </template>
        <template #pop>
          <pop-menu-item v-if="capabilities.viewProfile">Profile</pop-menu-item>
          <pop-menu-item>Change Password</pop-menu-item>
          <pop-menu-divider />
          <pop-menu-item @click="logout">Sign Out</pop-menu-item>
        </template>
      </pop-menu>
    </div>
  </header>
</template>

<script>
import PopMenu from '@/components/pop-menu'
import PopMenuItem from '@/components/pop-menu-item'
import PopMenuDivider from '@/components/pop-menu-divider'
import IconChevronDown from '@svgicons/chevron-down'
import IconMenu from '@svgicons/menu'

import user from '@/store/user'
import auth from '@/auth'

export default {
  components: {
    PopMenu,
    PopMenuItem,
    PopMenuDivider,
    IconChevronDown,
    IconMenu,
  },
  emits: ['open-menu'],
  props: {
    title: String,
  },
  setup() {
    const { fullName, initials, capabilities } = user

    async function logout() {
      auth.logout()
    }

    return { fullName, initials, logout, capabilities }
  },
}
</script>

<style lang="scss" module>
@use '@/sass/mixins/breakpoints';

.header {
  height: 60px;
  background: #fff;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  @include breakpoints.up(xl) {
    height: 80px;
  }
}

.left {
  display: flex;
  align-items: center;

  a {
    display: flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    color: #000;
  }
}

.right {
  display: flex;

  @include breakpoints.up(xl) {
    padding: 10px 20px;
  }
}

.title {
  font-weight: 900;
  font-size: 20px;
}

.profile {
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 600;

  @include breakpoints.up(md) {
    margin: 0 20px;
  }

  .chevron {
    margin-left: 2px;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #e5e5e5;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  margin-right: 10px;
  font-weight: 900;
}
</style>
