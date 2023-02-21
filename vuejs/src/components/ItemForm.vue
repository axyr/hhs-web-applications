<script setup>
import { reactive } from "vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const data = reactive({
  item: {
    title: null,
    categoryId: "",
    img: "",
  },
  defaultItem: {
    title: null,
    categoryId: "",
    img: "",
  },
});

const emit = defineEmits(["addItem"]);

function addItem() {
  emit("addItem", data.item);
  data.item = data.defaultItem;
}
</script>

<template>
  <form
    role="form"
    @submit.prevent="addItem"
    method="post"
    class="shadow rounded bg-white"
  >
    <h3>Add item</h3>
    <input
      type="text"
      v-model="data.item.title"
      class="shadow rounded bg-white"
      required
      placeholder="Enter title.."
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
        {{ category.title }}
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
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem 0;
}

h3 {
  margin-bottom: 1rem;
}

button {
  background-color: #0083ff;
  border: none;
  color: #fff;
}
</style>
