import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(pinia)
app.mount('#app')
