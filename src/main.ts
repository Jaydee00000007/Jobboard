import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import router from './router'

library.add(faUser, faPhone, faEnvelope, faLocationDot, faFacebookF, faTwitter, faLinkedinIn)

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
