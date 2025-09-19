import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router.js'
import axios from 'axios'

const app = createApp(App)
app.use(router);
app.mount('#app')
app.use(axios)