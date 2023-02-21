<script setup>
import { reactive, computed, watch, onMounted } from "vue";
import { useGlobalStore } from "@/stores/global.js";
import { useRoute, useRouter } from "vue-router";

import CollectionCard from "./CollectionCard.vue";
import CollectionSearch from "./CollectionSearch.vue";
import ItemPagination from "./ItemPagination.vue";
import ItemForm from "./ItemForm.vue";

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
  currentCollection: "books",
  name: "Collections",
  owner: "Martijn van Nieuwenhoven",
  logo: null,
  categories: [],
  items: [],
  favoriteItems: [],
  filteredItems: [],
  search: {},
  searchDefaults: {
    page: 1,
    perPage: 5,
    sort: "title:asc",
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

const nextId = computed(() => {
  return data.items.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
});

onMounted(() => {
  setCollectionFromRoute(route);
  fetchCollection();
});

watch(route, (from, to) => {
  if (from.params.collection !== to.params.collection) {
    setCollectionFromRoute(to);
    fetchCollection();
  }

  setSearchFromQuery();
});

watch(
  data.items,
  () => {
    filterItems();
  },
  { deep: true }
);

function setCollectionFromRoute(route) {
  data.currentCollection = route.params.collection
    ? route.params.collection
    : data.currentCollection;
}

function fetchCollection() {
  fetch(globalStore.collections[data.currentCollection].url)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      console.log("Could not load items.");
    })
    .then((json) => {
      data.name = json.name;
      data.owner = json.owner;
      data.logo = json.logo;
      data.categories = json.categories;
      data.items = json.items;

      data.items.forEach(function (item) {
        setCategoryTotalsAndItemCategory(item);
        setItemIsFavorite(item);
      });

      resetSearch();
      updateGlobalStore();
      setSearchFromQuery();
    });
}

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

function updateGlobalStore() {
  globalStore.setLogo(data.logo);
  globalStore.setWebsiteTitle(data.name);
  globalStore.setWebsiteOwner(data.owner);
  globalStore.setMetaTitle("Page 1");
}

function filterItems() {
  const sort = data.search.sort.split(":");
  const sortField = sort[0];
  const sortDirection = sort[1];

  data.filteredItems = data.items
    .filter(
      (item) =>
        !data.search.categories.length ||
        data.search.categories.includes(item.categoryId)
    )
    .filter(
      (item) =>
        data.search.favorites !== true || data.favoriteItems.includes(item.id)
    )
    .filter(
      (item) =>
        !data.search.term ||
        item.title.toLowerCase().includes(data.search.term.toLowerCase())
    )
    .sort((a, b) => {
      return typeof a[sortField] === "string"
        ? a[sortField].localeCompare(b[sortField])
        : a[sortField] > b[sortField];
    });

  if (sortDirection === "desc") {
    data.filteredItems.reverse();
  }
}

function setSearchFromQuery() {
  data.search = {
    page: route.query.page ? parseInt(route.query.page) : data.search.page,
    perPage: route.query.perPage
      ? parseInt(route.query.perPage)
      : data.search.perPage,
    sort: route.query.sort ? route.query.sort : data.search.sort,
    term: route.query.term ? route.query.term : data.search.term,
    favorites: route.query.favorites
      ? route.query.favorites === "true"
      : data.search.favorites,
    categories:
      typeof route.query.categories === "string"
        ? route.query.categories.split(",").map((id) => parseInt(id, 10))
        : [],
  };

  filterItems();
}

function onApplySearch(search) {
  if (typeof search.categories === "string") {
    search.categories = search.categories.join(",");
  }

  search = Object.fromEntries(
    Object.entries(search).filter(
      ([_, v]) => v != null && v !== "" && v !== false
    )
  );

  if (search.page * search.perPage > data.filteredItems.length) {
    search.page = 1;
  }

  router.replace({ query: search });
}

function onChangePage(page) {
  data.search.page = page;
  router.replace({ query: data.search });
}

function onChangePerPage(perPage) {
  data.search.perPage = perPage;
  data.search.page = 1;
  router.replace({ query: data.search });
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

function onAddItem(item) {
  item.id = nextId.value;
  setCategoryTotalsAndItemCategory(item);
  data.items.push(item);

  filterItems();
}
</script>

<template :key="data.currentCollection">
  <div class="container">
    <CollectionSearch
      :search="data.search"
      :categories="data.categories"
      :favoriteItems="data.favoriteItems"
      @applySearch="onApplySearch"
    />

    <ItemPagination
      v-if="data.filteredItems.length"
      :page="data.search.page"
      :perPage="data.search.perPage"
      :totalItems="totalItems"
      @changePage="onChangePage"
      @changePerPage="onChangePerPage"
    />

    <div id="cards">
      <CollectionCard
        v-for="(item, index) in paginatedItems"
        :key="index"
        :item="item"
        @toggleFavorite="onToggleFavorite"
      />
    </div>

    <ItemPagination
      v-if="data.filteredItems.length"
      :page="data.search.page"
      :perPage="data.search.perPage"
      :totalItems="totalItems"
      @changePage="onChangePage"
      @changePerPage="onChangePerPage"
    />

    <ItemForm
      :categories="data.categories"
      :items="data.items"
      @add-item="onAddItem"
    />
  </div>
</template>
