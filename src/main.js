import { createApp } from 'vue'
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import App from './App.vue'
import router from './router'
import auth from './store/auth.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App);

const store = createStore({
    plugins: [
      createPersistedState()
    ],
    modules: {
      auth,
    },
  });

app.use(router);
app.use(store);
app.use(VueSweetalert2);

app.mount('#app');
