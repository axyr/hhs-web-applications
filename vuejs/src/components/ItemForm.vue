<script setup>
import {computed, onMounted, reactive} from 'vue';
import {storeItem as apiStoreItem, updateItem as apiUpdateItem} from '@/collections.api';
import {useGlobalStore} from '@/stores/global.js';

const globalStore = useGlobalStore();

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    editingItem: {
        type: Object,
        required: false,
    },
});

const data = reactive({
    item: {
        name: null,
        categoryId: '',
        img: '',
    },
    defaultItem: {
        name: null,
        categoryId: '',
        img: '',
    },
    message: null,
});

const color = computed(() => globalStore.activeCollection ? globalStore.activeCollection.brandColor : '#0283ff');

const emit = defineEmits(['addItem', 'updateItem']);

onMounted(() => {
    data.item = props.editingItem;
});

function submitForm() {
    if (data.item.id) {
        updateItem(data.item);
    } else {
        createItem(data.item);
    }
}

function showMessage(message, timeout) {
    data.message = message;
    if (timeout) {
        setTimeout(() => data.message = null, timeout);
    }
}

const createItem = async (item) => {
    try {
        const response = await apiStoreItem(globalStore.activeCollection.id, item);
        emit('addItem', response.data);
        showMessage(`Item added: ${response.data.name}`, 2000);
        data.item = data.defaultItem;
    } catch (error) {
        handleError(error);
    }
};

const updateItem = async (item) => {
    try {
        const response = await apiUpdateItem(item);
        emit('updateItem', response.data);
        showMessage(`Item updated: ${response.data.name}`, 2000);
        data.item = response.data;
    } catch (error) {
        handleError(error);
    }
};

function handleError(error) {
    console.error(error);
    data.message = error;
}
</script>

<template>
    <form
        role="form"
        @submit.prevent="submitForm"
        method="post"
    >
        <input
            type="text"
            v-model="data.item.name"
            class="shadow rounded bg-white"
            required
            placeholder="Enter name.."
        />
        <select
            name="category"
            class="shadow rounded bg-white"
            v-model="data.item.categoryId"
            required
        >
            <option selected disabled value="">Select category</option>
            <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
            >
                {{ category.name }}
            </option>
        </select>
        <select
            name="image"
            v-model="data.item.img"
            class="shadow rounded bg-white"
            required
        >
            <option selected disabled value="">Select image</option>
            <option v-for="item in items" :key="item.id">
                {{ item.img }}
            </option>
        </select>
        <button type="submit" class="shadow rounded">Save</button>
        <div
            class="message rounded"
            v-if="data.message"
        >
            {{ data.message }}
        </div>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}

button {
    background-color: v-bind(color);
    border: none;
    color: #fff;
}

.message {
    margin: 1rem 0;
    padding: 0.5rem;
    color: #fff;
    background-color: #45B23DFF;
}

.message.warning {
    background-color: #F32C31;
}
</style>