import { createApp } from 'vue'
import './assets/st-design.css'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { nbTheme } from './styles/theme'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'nbTheme',
    themes: { nbTheme },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
