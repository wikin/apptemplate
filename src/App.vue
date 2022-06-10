<template>
  <template v-if="isReady">
    <router-view />
  </template>

  <template v-if="message">
    <h1>Error</h1>
    <p>{{ message }}</p>
  </template>
</template>

<script>
import auth from '@/auth'
import user from '@/store/user'
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const isReady = ref(false)
    const message = ref()

    onMounted(async () => {
      try {
        await auth.init()
        await user.get()
        isReady.value = true
      } catch (err) {
        message.value = err
      }
    })

    return { isReady, message }
  },
}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
}

body {
  background: #f5f5f5;
  font-family: 'Open Sans', sans-serif;
  color: #000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex-direction: column;
  font-size: 16px;
}
</style>
