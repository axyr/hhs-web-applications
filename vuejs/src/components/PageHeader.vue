<script setup>
import {computed} from 'vue';
import {useGlobalStore} from '@/stores/global.js';
import {useRoute, useRouter} from 'vue-router';

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

const color = computed(() => globalStore.activeCollection ? globalStore.activeCollection.brandColor : '#0283ff');

const menuItems = computed(() => {
    const items = [];

    globalStore.collections.forEach(function (collection) {
        items.push({
            id: collection.id,
            name: collection.name,
            class: collection.id === route.params.collection ? 'active' : '',
        });
    });

    return items;
});

function goHome() {
    router.push({name: 'home'});
}

function goToCollection(collection) {
    router.push({name: 'collection', params: {collection}});
}
</script>

<template>
    <header class="shadow bg-white">
        <div class="container">
            <a href="#" id="logo" @click="goHome">
                <img
                    v-if="globalStore.logo"
                    :src="globalStore.logo"
                    :alt="globalStore.title"
                    height="32"
                />
                <span>{{ globalStore.title }}</span>
            </a>
            <nav>
                <ul id="main-nav">
                    <li v-for="item in menuItems" :key="item.id">
                        <a
                            href="#"
                            :class="item.class"
                            @click="goToCollection(item.id)"
                        >
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
}

header .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#logo {
    display: inline-block;
    position: relative;
    padding: 1rem 0 0.9rem 0;
    cursor: pointer;
    color: #101827;
    text-decoration: none;
    font-size: 1.5rem;
}

#logo span {
    position: relative;
    top: -0.6rem;
    margin-left: 0.5rem;
}

nav ul li {
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 0;
}

nav ul li a {
    display: inline-block;
    padding: 1.4rem;
    margin: 0;
    text-decoration: none;
    text-transform: uppercase;
    color: #101827;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
}

nav ul li a.active,
nav ul li a:hover {
    background-color: #f8fafb;
    border-bottom: 2px solid #0083ff;
}
</style>