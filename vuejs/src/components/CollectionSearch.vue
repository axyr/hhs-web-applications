<script setup>
import {computed} from 'vue';

const props = defineProps({
    categories: {
        type: Array,
        default() {
            return [];
        },
    },
    favoriteItems: {
        type: Array,
        default() {
            return [];
        },
    },
    sortFields: {
        type: Array,
        default() {
            return ['title', 'id'];
        },
    },
    search: {
        type: Object,
        default() {
            return {
                page: 1,
                perPage: 5,
                sort: 'title:asc',
                term: null,
                favorites: false,
                categories: [],
            };
        },
    },
});

const favoritesLabel = computed(() => {
    const favoritesCount = Object.keys(props.favoriteItems).length;
    return `Favorites (${favoritesCount})`;
});

const sortOptions = computed(() => {
    const sortOptions = [];

    props.sortFields.forEach(function (field) {
        sortOptions.push({
            value: `${field}:asc`,
            label: `Sort by ${field} ascending`,
            selected: props.search.sort === `${field}:asc`,
        });
        sortOptions.push({
            value: `${field}:desc`,
            label: `Sort by ${field} descending`,
            selected: props.search.sort === `${field}:desc`,
        });
    });

    return sortOptions;
});

const emit = defineEmits(['applySearch']);

function applySearch(debounceTimeout) {
    setTimeout(() => {
        emit('applySearch', props.search);
    }, debounceTimeout);
}

function toggleCategorySearch(category) {
    if (props.search.categories?.includes(category.id)) {
        props.search.categories = props.search.categories.filter(
            (id) => id !== category.id
        );
    } else {
        props.search.categories.push(category.id);
    }

    applySearch();
}

function categoryIsSelected(category) {
    return props.search.categories?.includes(category.id);
}
</script>

<template>
    <div>
        <div id="filterbar">
            <div id="search">
                <input
                    type="search"
                    id="search-field"
                    class="rounded shadow"
                    placeholder="Search..."
                    v-model="search.term"
                    @keyup="applySearch(300)"
                    @search="applySearch"
                />
            </div>
            <div id="favorites">
                <div class="checkbox shadow rounded bg-white">
                    <label for="checkbox-favorite">
                        <input
                            type="checkbox"
                            value="favorite"
                            id="checkbox-favorite"
                            v-model="search.favorites"
                            @change="applySearch"
                        />
                        {{ favoritesLabel }}
                    </label>
                </div>
            </div>
            <div>
                <select
                    id="sort"
                    class="shadow rounded"
                    v-model="search.sort"
                    @change="applySearch"
                >
                    <option
                        v-for="sortOption in sortOptions"
                        :value="sortOption.value"
                        :key="sortOption.value"
                        :selected="sortOption.selected"
                    >
                        {{ sortOption.label }}
                    </option>
                </select>
            </div>
        </div>
        <div id="categories">
            <div
                v-for="category in categories"
                :key="category.id"
                class="checkbox shadow rounded bg-white"
            >
                <label :for="`checkbox-category-${category.id}`">
                    <input
                        type="checkbox"
                        value="favorite"
                        :id="`checkbox-category-${category.id}`"
                        :checked="categoryIsSelected(category)"
                        @change="toggleCategorySearch(category)"
                    />
                    {{ category.title }} ({{ category.itemCount }})
                </label>
            </div>
        </div>
    </div>
</template>

<style scoped>
#filterbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 0 1rem 0;
}

#categories {
    padding-bottom: 1rem;
}

#search {
    flex-grow: 1;
    padding-right: 1rem;
}

@media only screen and (max-width: 768px) {
    #filterbar {
        flex-direction: column-reverse;
        display: block;
    }

    #search {
        padding-bottom: 2rem;
        width: 100%;
    }

    #categories {
        margin-bottom: 2rem;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
        padding: 0.5rem;
        background-color: #fff;
    }

    #categories .checkbox {
        margin: 0;
        width: calc(100% - 1rem);
        border-radius: 0;
        box-shadow: none;
    }

    #favorites {
        margin-bottom: 1rem;
    }

    #favorites .checkbox {
        padding: 0.5rem 1rem;
        width: calc(100% - 2rem);
    }
}
</style>