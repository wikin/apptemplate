import nprogress from 'nprogress'

export default function install(app) {
  const loadedPages = Object.create(null)
  nprogress.configure({ showSpinner: false })

  app.config.globalProperties.$router.beforeEach((to, from, next) => {
    if (!loadedPages[to.path]) {
      nprogress.start()
    }
    next()
  })

  app.config.globalProperties.$router.afterEach((to) => {
    loadedPages[to.path] = true
    nprogress.done()
  })
}
