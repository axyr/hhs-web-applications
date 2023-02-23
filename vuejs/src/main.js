import {createApp} from "vue/dist/vue.esm-bundler";
import {createRouter, createWebHistory} from "vue-router";
import {createPinia} from "pinia";

import App from "./App.vue";

import "./assets/app.css";

const routes = [
    {
        name: "home",
        path: "/",
        component: App,
    },
    {
        name: "collections",
        path: "/collection/:collection",
        component: App,
    },
    {
        path: "/:catchAll(.*)",
        redirect: () => {
            return {path: "/"};
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: window.location.origin,
    routes,
});

const pinia = createPinia();

const app = createApp({});

app.use(router);
app.use(pinia);

app.mount("#app");
