import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import i18n from './i18n'

const app = createApp(App);
app.use(router).use(VueSweetalert2).use(i18n).mount('#app')
