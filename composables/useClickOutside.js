import { createApp } from 'vue'
import vClickOutside from 'click-outside-vue3'
import App from './App.vue'

const app = createApp(App)
app.use(vClickOutside)
