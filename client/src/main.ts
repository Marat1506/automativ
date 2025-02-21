import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import native from 'naive-ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(native)
app.use(createPinia())
app.use(router)

app.mount('#app')
