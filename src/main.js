import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faGripVertical)

const pinia = createPinia()
const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
