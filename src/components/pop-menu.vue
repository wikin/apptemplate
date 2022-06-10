<template>
  <a
    ref="opennedElement"
    href="#"
    v-bind="$attrs"
    @click.prevent="open"
    @contextmenu.prevent.stop="open"
    ><slot
  /></a>
  <template v-if="isOpen">
    <teleport to="body">
      <modal-cover @click="close" v-if="!$screen.md" />
      <div ref="popElement" :class="$style.menu" :style="style" @click="close">
        <div :class="$style.header">
          <div :class="$style.in">
            <slot name="header" />
          </div>
          <a href="#" :class="$style.close" @click.prevent="close">
            <icon-cross :size="18" />
          </a>
        </div>
        <slot name="pop" />
      </div>
    </teleport>
  </template>
</template>

<script>
import ModalCover from '@/components/modal-cover'
import IconCross from '@svgicons/cross'
import { ref, onUnmounted, nextTick } from 'vue'

export default {
  components: {
    ModalCover,
    IconCross,
  },
  setup() {
    const isOpen = ref(false)
    const opennedElement = ref()
    const popElement = ref()
    const style = ref()

    async function open() {
      isOpen.value = true
      document.body.addEventListener('click', __close)
      window.addEventListener('resize', __position)

      await nextTick()
      __position()
    }

    onUnmounted(() => {
      document.body.removeEventListener('click', __close)
      window.removeEventListener('resize', __position)
    })

    function close() {
      isOpen.value = false
      document.body.removeEventListener('click', __close)
      window.removeEventListener('resize', __position)
    }

    function __close(event) {
      if (
        event.target !== opennedElement.value &&
        !opennedElement.value.contains(event.target) &&
        popElement.value &&
        !popElement.value.contains(event.target)
      ) {
        close()
      }
    }

    function __position() {
      const el = opennedElement.value
      const pop = popElement.value
      const rectPop = pop.getBoundingClientRect()

      const rectEl = el.getBoundingClientRect()

      let top = rectEl.top + rectEl.height
      if (top + rectPop.height > window.innerHeight) {
        top = rectEl.top - rectPop.height
      }

      let left = rectEl.left
      if (left + rectPop.width > window.innerWidth - 20) {
        //TODO: align to right
        //left = rectEl.left + rectEl.width - rectPop.width

        left = window.innerWidth - rectPop.width - 20
      }

      style.value = {
        top: `${top}px`,
        left: `${left}px`,
      }
    }

    return { isOpen, open, close, opennedElement, popElement, style }
  },
}
</script>

<style lang="scss" module>
@use '@/sass/mixins/breakpoints';

.menu {
  position: fixed;
  z-index: 100;
  background: white;
  padding-bottom: 12px;

  @include breakpoints.up(md) {
    padding-top: 12px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.16);
  }

  @include breakpoints.down(sm) {
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    animation: pop-menu 0.2s;
  }
}

.header {
  background: #f9f9f9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  min-height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  margin-bottom: 12px;
  font-weight: 700;

  @include breakpoints.up(md) {
    display: none;
  }
}

.in {
  flex: 1;
}

.close {
  text-decoration: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  color: #000;
  background: #e5e5e5;
  flex-shrink: 0;
}

@keyframes pop-menu {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
