import webpack from 'webpack'

const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
import { resolve } from 'path'

module.exports = {
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  },
  generate: {
    routes: ['404']
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'PACK&GO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  transpile: [/^vue2-google-maps($|\/)/],
  components: true,
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/components.js',
    '~/plugins/events.js',
    '~/plugins/font-awesome.js',
    '~/plugins/http.js',
    '~/plugins/vue-smooth-picker.js',
    '~/plugins/vue-croppa.js',
    '~/plugins/vue-wysiwyg.js',
    {src: '~/plugins/vue-sample-uploader.js', ssr: false},
    {src: '~/plugins/pusher-js.js', ssr: false},
    {src: '~/plugins/vue2-google-maps.js', ssr: false},
    '~/plugins/vue-js-modal',
    {src: '~/plugins/localStorage.js', ssr: false },
    '~/plugins/filters.js',
    { src: '@/plugins/vue-html2pdf', mode: 'client' }
  ],
  css: [
    '~/assets/style/app.styl',
  ],
  env: {
    API_URL: 'http://192.168.1.13:50506',
    BASE_URL: 'http://192.168.1.13',
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/apollo',
    'nuxt-material-design-icons',
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60
    }],
    'vue-sweetalert2/nuxt'
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:8000/api/application/graphiql',
      }
    }
  },
    /*
  ** If you  want to use static hosting use 'target: static' in order for the generate command to work properly.
  */

  // target: 'static',

  target: 'server', /* server hosting, when using build command */
  
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      config.resolve.symlinks = false
    },
    postcss: null
  }
}
