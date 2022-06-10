import { reactive } from 'vue'

let width = window.innerWidth
const screen = reactive({
  xs: true,
  sm: width >= 568,
  md: width >= 768,
  lg: width >= 992,
  xl: width >= 1200,
  xxl: width >= 1600,
})

export default function install(app) {
  app.config.globalProperties.$screen = screen

  window.addEventListener('resize', function () {
    let width = window.innerWidth
    screen.sm = width > 568
    screen.md = width > 768
    screen.lg = width > 992
    screen.xl = width > 1200
    screen.xxl = width > 1600
  })
}

export { screen }
