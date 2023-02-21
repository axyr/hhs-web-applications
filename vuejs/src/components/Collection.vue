<script setup>

import {reactive, computed, watch, onMounted} from 'vue';
import {useGlobalStore} from '@/stores/global.js';
import {useRoute, useRouter} from 'vue-router';

import CollectionCard from './CollectionCard.vue';
import CollectionSearch from './CollectionSearch.vue';
import Pagination from './Pagination.vue';

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
    collection: {
        name: 'Collections',
        owner: 'Martijn van Nieuwenhoven',
        logo: null,
        items: [],
        categories: [],
    },
    currentCollection: 'books',
    search: {},
    searchDefaults: {
        page: 1,
        perPage: 5,
        sort: 'title:asc',
        term: null,
        favorites: false,
        categories: [],
    },
    favoriteItems: [],
    filteredItems: [],
});

const paginatedItems = computed(() => {
    const firstItem = (data.search.page * data.search.perPage) - data.search.perPage;
    const lastItem = firstItem + data.search.perPage;

    return data.filteredItems.slice(firstItem, lastItem);
});

onMounted(() => {
    data.currentCollection = route.params.collection ? route.params.collection : data.currentCollection;
    fetchCollection();
});

watch(route, (to) => {
    data.currentCollection = to.params.collection ? to.params.collection : data.currentCollection;
    fetchCollection();
    setSearchFromQuery();
});

function fetchCollection() {
    fetch(globalStore.collections[data.currentCollection].url).then(response => {
        return response.json();
    }).catch(() => {
        console.log('Could not load items.');
    }).then(json => {
        data.collection = json;
        data.collection.items.forEach(function (item) {
            setCategoryTotalsAndItemCategory(item);
            setItemIsFavorite(item);
        });

        resetSearch();
        updateGlobalStore();
        setSearchFromQuery();
    });
}

function setCategoryTotalsAndItemCategory(item) {
    data.collection.categories.forEach(function (category) {
        if (item.categoryId === category.id) {
            category.itemCount++;
            item.category = category;
        }
    });
}

function setItemIsFavorite(item) {
    item.isFavorite = data.favoriteItems.includes(item.id);
}

function resetSearch() {
    data.search = data.searchDefaults;
}

function updateGlobalStore() {
    globalStore.setLogo(data.collection.logo);
    globalStore.setWebsiteTitle(data.collection.name);
    globalStore.setWebsiteOwner(data.collection.owner);
    globalStore.setMetaTitle('Page 1');
}

function filterItems() {
    const sort = data.search.sort.split(':');
    const sortField = sort[0];
    const sortDirection = sort[1];
    const low = sortDirection === 'desc' ? -1 : 1;
    const high = low * -1;

    data.filteredItems = data.collection.items
        .filter(item => !data.search.categories.length || data.search.categories.includes(item.categoryId))
        .filter(item => data.search.favorites !== true || data.favoriteItems.includes(item.id))
        .filter(item => !data.search.term || item.title.toLowerCase().includes(data.search.term.toLowerCase()))
        .sort((a, b) => (a[sortField] > b[sortField]) ? low : high);
}

function setSearchFromQuery() {
    data.search = {
        page: route.query.page ? parseInt(route.query.page) : data.search.page,
        perPage: route.query.perPage ? parseInt(route.query.perPage) : data.search.perPage,
        sort: route.query.sort ? route.query.sort : data.search.sort,
        term: route.query.term ? route.query.term : data.search.term,
        favorites: route.query.favorites ? route.query.favorites === "true" : data.search.favorites,
        categories: typeof route.query.categories === 'string' ? route.query.categories.split(',').map(id => parseInt(id, 10)) : [],
    }

    filterItems();
}

function onApplySearch(search) {
    search.categories = search.categories.join(',');

    search = Object.fromEntries(Object.entries(search).filter(([_, v]) => v != null && v !== "" && v !== false));
    if (search.page * search.perPage > data.filteredItems.length) {
        search.page = 1;
    }
    router.replace({query: search});
}

function onChangePage(page) {
    data.search.page = page;
    router.replace({query: data.search});
}

function onChangePerPage(perPage) {
    data.search.perPage = perPage;
    data.search.page = 1;
    router.replace({query: data.search});
}

function onToggleFavorite(item) {
    if (data.favoriteItems.includes(item.id)) {
        data.favoriteItems = data.favoriteItems.filter(id => id !== item.id);
    } else {
        data.favoriteItems.push(item.id);
    }

    setItemIsFavorite(item);
}

</script>

<template :key="data.currentCollection">
    <div class="container">

        <CollectionSearch
            :search="data.search"
            :categories="data.collection.categories"
            :favoriteItems="data.favoriteItems"
            @applySearch="onApplySearch"
        />

        <Pagination
            :page="data.search.page"
            :per-page="data.search.perPage"
            :total-items="data.filteredItems.length"
            @changePage="onChangePage"
            @changePerPage="onChangePerPage"
        />

        <div id="cards">
            <div v-for="(item, index) in paginatedItems">
                <CollectionCard
                    :key="index"
                    :item="item"
                    @toggleFavorite="onToggleFavorite"
                />
            </div>
        </div>

        <Pagination
            :page="data.search.page"
            :per-page="data.search.perPage"
            :total-items="data.filteredItems.length"
            @changePage="onChangePage"
            @changePerPage="onChangePerPage"
        />
    </div>
</template>