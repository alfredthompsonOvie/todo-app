import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'

createApp(App).use(autoAnimatePlugin).mount('#app')
