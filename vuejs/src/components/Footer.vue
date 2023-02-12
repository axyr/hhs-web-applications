<script setup>
import {reactive} from "vue";

const data = reactive({
    year: new Date().getFullYear(),
    name: 'Martijn van Nieuwenhoven'
});

</script>

<template>
    <footer>
        <div class="container">
            <p>© {{ data.year }} {{ data.name }}</p>
        </div>
    </footer>
</template>

<style scoped>

footer {
    width: calc(100% - 4rem);
    text-align: center;
    padding: 2rem;
    background-color: #666;
    color: #fff;
}

</style>