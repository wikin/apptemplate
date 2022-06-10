module.exports = {
  /**
   * @see https://cli.vuejs.org/config/#productionsourcemap
   */
  productionSourceMap: process.env.NODE_ENV != 'production',

  /**
   * Load all files as modules by default, needed for scss files
   * (no needs to add '.module.scss' into the the filenames)
   * @see https://cli.vuejs.org/config/#css-requiremoduleextension
   */
   css: {
    loaderOptions: {
      css: {
        modules: false,
      },
    },
  },

  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'App',
    },
  },

  /**
   * @see https://cli.vuejs.org/config/#chainwebpack
   * @param config Webpack chain.
   */
  chainWebpack(config) {
    // Drop console messages from production build
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
}
