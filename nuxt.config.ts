import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error 'config.plugins' is possibly 'undefined
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    'nuxt-svgo',
    '@pinia/nuxt',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  googleFonts: {
    families: {
      Figtree: true,
    },
  },
  css: ['~/assets/css/main.scss'],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  svgo: {
    defaultImport: 'component',
  },
  runtimeConfig: {
    proxyUrl: 'http://localhost:3333',
  },
})
