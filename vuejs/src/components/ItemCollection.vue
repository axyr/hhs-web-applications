<script setup>
import {reactive, computed, watch, onMounted} from 'vue';
import {useGlobalStore} from '@/stores/global.js';
import {useRoute, useRouter} from 'vue-router';
import CollectionCard from './CollectionCard.vue';
import ModalPopup from './ModalPopup.vue';
import CollectionSearch from './CollectionSearch.vue';
import ItemPagination from './ItemPagination.vue';
import ItemForm from './ItemForm.vue';
import FloatingButton from './FloatingButton.vue';
import {getCategories, getCollections, getItems, deleteItem} from '@/collections.api.js';

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
    name: 'Collections',
    owner: 'Martijn van Nieuwenhoven',
    logo: null,
    categories: [],
    items: [],
    favoriteItems: [],
    filteredItems: [],
    search: {},
    showItemForm: false,
    itemToBeDeleted: null,
    editingItem: null,
    searchDefaults: {
        page: 1,
        perPage: 5,
        sort: 'name:asc',
        term: null,
        favorites: false,
        categories: [],
    },
});

const totalItems = computed(() => Object.entries(data.filteredItems).length);

const paginatedItems = computed(() => {
    const firstItem =
        data.search.page * data.search.perPage - data.search.perPage;
    const lastItem = firstItem + data.search.perPage;

    return data.filteredItems.slice(firstItem, lastItem);
});

const showItemForm = computed(() => globalStore.activeCollection && data.showItemForm);
const showConfirmDelete = computed(() => data.itemToBeDeleted !== null);

onMounted(async () => {
    await loadCollections();
    await setCollectionFromRoute(route);
});

watch(route, (from, to) => {
    if (to.params.collection && globalStore.activeCollection.id !== parseInt(to.params.collection)) {
        setCollectionFromRoute(to);
    }

    setSearchFromQuery();
});

watch(data.items, () => {
        filterItems();
    },
    {
        deep: true
    }
);

const setCollectionFromRoute = async (route) => {
    if (route.params.collection) {
        globalStore.setActiveCollection(route.params.collection);
    }
    await fetchCollection();
};

const loadCollections = async () => {
    try {
        const response = await getCollections();
        globalStore.setCollections(response.data);

    } catch (error) {
        console.error(error);
    }
};

const fetchCollection = async () => {
    try {
        if (globalStore.activeCollection) {
            const categoryResponse = await getCategories(globalStore.activeCollection.id);
            data.categories = categoryResponse.data;

            const itemResponse = await getItems(globalStore.activeCollection.id);
            data.items = itemResponse.data;
        }
    } catch {
        console.log('Could not load items.');
    } finally {
        data.items.forEach(function (item) {
            setCategoryTotalsAndItemCategory(item);
            setItemIsFavorite(item);
        });

        resetSearch();
        setSearchFromQuery();
    }
};

function setCategoryTotalsAndItemCategory(item) {
    data.categories.forEach(function (category) {
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

function filterItems() {
    const sort = data.search.sort.split(':');
    const sortField = sort[0];
    const sortDirection = sort[1];

    data.filteredItems = data.items
        .filter((item) => !data.search.categories.length || data.search.categories.includes(item.categoryId))
        .filter((item) => data.search.favorites !== true || data.favoriteItems.includes(item.id))
        .filter((item) => !data.search.term || item.name.toLowerCase().includes(data.search.term.toLowerCase()))
        .sort((a, b) => typeof a[sortField] === 'string' ? a[sortField].localeCompare(b[sortField]) : a[sortField] > b[sortField]);

    if (sortDirection === 'desc') {
        data.filteredItems.reverse();
    }
}

function setSearchFromQuery() {
    data.search = {
        page: route.query.page ? parseInt(route.query.page) : data.search.page,
        perPage: route.query.perPage ? parseInt(route.query.perPage) : data.search.perPage,
        sort: route.query.sort ? route.query.sort : data.search.sort,
        term: route.query.term ? route.query.term : data.search.term,
        favorites: route.query.favorites ? route.query.favorites === 'true' : data.search.favorites,
        categories: typeof route.query.categories === 'string' ? route.query.categories.split(',').map((id) => parseInt(id, 10)) : [],
    };

    filterItems();
}

function onApplySearch(search) {
    if (typeof search.categories !== 'string') {
        search.categories = search.categories.join(',');
    }

    search = Object.fromEntries(Object.entries(search).filter(([_, v]) => v != null && v !== '' && v !== false));

    if (search.page * search.perPage > data.filteredItems.length) {
        search.page = 1;
    }

    router.replace({query: search});
}

function onChangePage(page) {
    data.search.page = page;
    router.replace({query: data.search});
    globalStore.setMetaTitle(`Page ${page}`);
}

function onChangePerPage(perPage) {
    data.search.perPage = perPage;
    data.search.page = 1;
    router.replace({query: data.search});
}

function onToggleFavorite(item) {
    if (data.favoriteItems.includes(item.id)) {
        data.favoriteItems = data.favoriteItems.filter((id) => id !== item.id);
    } else {
        data.favoriteItems.push(item.id);
    }

    setItemIsFavorite(item);
    filterItems();
}

function onDeleteItem(item) {
    data.itemToBeDeleted = item;
}

function onEditItem(item) {
    data.editingItem = item;
    data.showItemForm = true;
}

function onAddItem(item) {
    setCategoryTotalsAndItemCategory(item);
    data.items.push(item);
    filterItems();
}

function onUpdateItem(item) {
    const index = data.items.findIndex(obj => obj.id === item.id);
    data.items[index] = item;
    console.log(item);

    filterItems();
}

function onAddButtonClick() {
    data.showItemForm = true;
}

function hideItemForm() {
    data.editingItem = null;
    data.showItemForm = false;
}

function hideConfirmDelete() {
    data.itemToBeDeleted = null;
}

const deleteItemToBeDeleted = async () => {
    try {
        await deleteItem(data.itemToBeDeleted.id);
        data.items = data.items.filter((item) => item.id !== data.itemToBeDeleted.id);
        data.itemToBeDeleted = null;
        filterItems();
    } catch (error) {
        console.error(error);
    }
};

</script>

<template :key="data.currentCollection">
    <div class="container">
        <CollectionSearch
            :search="data.search"
            :categories="data.categories"
            :favorite-items="data.favoriteItems"
            @apply-search="onApplySearch"
        />

        <ItemPagination
            v-if="data.filteredItems.length"
            :page="data.search.page"
            :per-page="data.search.perPage"
            :total-items="totalItems"
            @change-page="onChangePage"
            @change-per-page="onChangePerPage"
        />

        <div id="cards">
            <CollectionCard
                v-for="(item, index) in paginatedItems"
                :key="index"
                :item="item"
                @toggle-favorite="onToggleFavorite"
                @delete-item="onDeleteItem"
                @edit-item="onEditItem"
            />
        </div>

        <ItemPagination
            v-if="data.filteredItems.length"
            :page="data.search.page"
            :per-page="data.search.perPage"
            :total-items="totalItems"
            @change-page="onChangePage"
            @change-per-page="onChangePerPage"
        />

        <FloatingButton
            v-if="globalStore.activeCollection"
            :color="globalStore.activeCollection.brandColor"
            @click="onAddButtonClick"
        />

        <ModalPopup
            v-if="showItemForm"
            @close="hideItemForm"
            :title="data.editingItem ? 'Edit Item': 'Add Item'"
            height="300px"
        >
            <template v-slot:body>
                <ItemForm
                    :categories="data.categories"
                    :items="data.items"
                    :editing-item="data.editingItem"
                    @add-item="onAddItem"
                    @update-item="onUpdateItem"
                />
            </template>
        </ModalPopup>

        <ModalPopup
            v-if="showConfirmDelete"
            @close="hideConfirmDelete"
            @confirm="deleteItemToBeDeleted"
            title="Delete item"
            height="170px"
            :show-confirm="true"
        >
            <template v-slot:body>
                Are you sure you want to delete this item?
                <br> {{ data.itemToBeDeleted.name }}
            </template>
        </ModalPopup>
    </div>
</template>