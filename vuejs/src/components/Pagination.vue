<script setup>

import {computed} from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1
    },
    perPage: {
        type: Number,
        default: 5
    },
    totalItems: {
        type: Number,
        default: 15
    },
    perPageOptions: {
        type: Array,
        default: [
            5,
            10,
            20,
        ],
    },
});

const numberOfPages = computed(() => Math.ceil(props.totalItems / props.perPage));
const pages = computed(() => Array.from({length: numberOfPages.value}, (_, i) => i + 1));
const showGoPrevious = computed(() => props.page > 1);
const showGoNext = computed(() => props.page < numberOfPages.value);
const showGoFirst = computed(() => props.page - 1 > 1);
const showGoLast = computed(() => props.page + 1 < numberOfPages.value);
const firstItem = computed(() => (props.perPage * props.page) - props.perPage + 1);
const lastItem = computed(() => {
    const lastItem = firstItem.value + props.perPage - 1;
    return lastItem > props.totalItems ? props.totalItems : lastItem;
});

const emit = defineEmits(['changePerPage', 'changePage']);

function changePerPage(e) {
    emit('changePerPage', parseInt(e.target.value));
}

function goToPage(page) {
    page = page > 0 && page <= numberOfPages.value ? page : 1;
    emit('changePage', page);
}

function goToFirstPage() {
    goToPage(1);
}

function goToLastPage() {
    goToPage(numberOfPages.value);
}

function goToPreviousPage() {
    goToPage(props.page - 1);
}

function goToNextPage() {
    goToPage(props.page + 1);
}

</script>

<template>
    <div class="pagination">
        <div>
            <span>
                Showing {{ firstItem }} to {{ lastItem }} of {{ props.totalItems }} results -
            </span>
            <select id="per-page" class="shadow rounded" @change="changePerPage">
                <option v-for="perPageOption in perPageOptions" :value="perPageOption" :selected="perPageOption === props.perPage">
                    {{ perPageOption }}
                </option>
            </select> Items per page
        </div>
        <div>
            <ul>
                <li>
                    <button :disabled="!showGoFirst" @click="goToFirstPage">&laquo;</button>
                </li>
                <li>
                    <button :disabled="!showGoPrevious" @click="goToPreviousPage">&lsaquo;</button>
                </li>
                <li v-for="page in pages" :key="page">
                    <button :disabled="page === props.page" @click="goToPage(page)">{{ page }}</button>
                </li>
                <li>
                    <button :disabled="!showGoNext" @click="goToNextPage">&rsaquo;</button>
                </li>
                <li>
                    <button :disabled="!showGoLast" @click="goToLastPage">&raquo;</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.pagination {
    margin: 1rem auto;
    display: flex;
    justify-content: space-between;
}

.pagination > div > select {
    margin: 0.5rem 0 0 0;
}

ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

li {
    list-style: none;
    margin: 0.5rem;
}

button {
    border: none;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
    background-color: #fff;
    padding: 0.5rem 1rem;
}

button:not([disabled]) {
    cursor: pointer;
}

</style>