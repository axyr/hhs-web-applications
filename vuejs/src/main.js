import {createApp} from 'vue/dist/vue.esm-bundler';
import {createRouter, createWebHistory} from 'vue-router';
import {createPinia} from 'pinia';
import routes from './routes/routes.js';
import './assets/app.css';

const router = createRouter({
    history: createWebHistory(),
    base: window.location.origin,
    routes,
});

const pinia = createPinia();

const app = createApp({});

app.use(router);
app.use(pinia);

app.mount('#app');