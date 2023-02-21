<script setup>

import {computed} from 'vue';

const emit = defineEmits(['toggleFavorite']);

const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: {
            id: null,
            img: null,
            title: null,
            category: {
                title: null,
            },
            isFavorite: false,
        }
    }
});

const favoriteImage = computed(() => {
    return props.item.isFavorite ? '/assets/img/heart-solid.svg' : '/assets/img/heart-regular.svg';
});

const favoriteTitle = computed(() => {
    return props.item.isFavorite ? 'Mark as favorite!' : 'Remove from favorites!';
});

function toggleFavorite(item) {
    emit('toggleFavorite', item);
}

</script>

<template>
    <div class="card shadow rounded bg-white">
        <div class="image">
            <img :src="item.img" :alt="item.title">
        </div>
        <div class="content">
        <span class="number bg-gray">
            {{ item.id }}
        </span>
            <div class="content-inner">
                <h3>{{ item.title }}</h3>
            </div>
            <div class="category bg-gray">
                {{ item.category.title }}
                <button class="favorite" :title="favoriteTitle" :value="item.id" @click="toggleFavorite(item)">
                    <img :src="favoriteImage" :alt="favoriteTitle">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.card {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    overflow: hidden;
}

.card .image {
    width: 300px;
    height: 300px;
    max-width: 300px;
    min-height: 300px;
    overflow: hidden;
    text-align: center;
}

.card .image img {
    display: block;
    width: 100%;
    min-height: 300px;
    object-fit: cover;
}

.card .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
}

.card .content .content-inner {
    padding: 1rem;
    position: relative;
}

.card .content .number {
    position: absolute;
    right: 0;
    padding: 0.5rem;
    width: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 0.9rem;
}

.card .content .category {
    padding: 0.5rem 0 0.5rem 1rem;
    text-transform: uppercase;
    font-size: 0.9rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.card .content .favorite {
    border: none;
    background: none;
    width: 1rem;
    cursor: pointer;
    margin-right: 1rem;
    position: relative;
    padding: 0;
    box-shadow: none;
}

.card .content .favorite img {
    font-size: 1rem;
    position: relative;
    top: 0.2rem;
}

@media only screen and (max-width: 480px) {

    .card {
        flex-direction: column;
    }

    .card .content .number {
        padding-top: 1rem;
        height: 100%;
    }

    .card .image {
        width: 100%;
        max-width: 100%;
        height: auto;
    }

}


@media only screen and (max-width: 639px) {

    .card img {
        width: 50%;
    }
}

</style>