import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import axios from 'axios'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios)
app.mount('#app')
