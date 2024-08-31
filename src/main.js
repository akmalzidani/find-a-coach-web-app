import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app
  .component('BaseCard', BaseCard)
  .component('BaseButton', BaseButton)
  .component('BaseBadge', BaseBadge)

app.mount('#app')
