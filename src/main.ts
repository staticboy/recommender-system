import { createApp } from 'vue'
import { Notify, Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router/routes'
import './index.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.css'
import App from './App.vue'

let app = createApp(App)
let router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)
app.use(Quasar, {
  plugins: { Notify },
  config: { notify: { position: 'bottom' } },
})
app.mount('#app')