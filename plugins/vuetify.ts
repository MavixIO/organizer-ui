import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    display: {
      mobileBreakpoint: 'sm',
    },
    theme: {
      defaultTheme: 'myTheme',
      themes: {
        myTheme: {
          colors: {
            primary: '#2970FF',
            background:'#F7F8FA',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
