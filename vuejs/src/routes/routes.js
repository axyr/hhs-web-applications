import App from '@/App.vue';

export default [
    {
        name: 'home',
        path: '/',
        component: App,
    },
    {
        name: 'collection',
        path: '/collection/:collection',
        component: App,
    },
    {
        path: '/:catchAll(.*)',
        redirect: () => {
            return {path: '/'};
        },
    },
];