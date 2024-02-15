import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createManager } from '@vue-youtube/core';

import App from './App.vue'

import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(createManager())

app.mount('#app')
