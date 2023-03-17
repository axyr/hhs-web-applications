<script setup>
import {useGlobalStore} from '@/stores/global.js';

const globalStore = useGlobalStore();
</script>

<template>
    <footer>
        <div class="container">
            <p>{{ globalStore.footerLine }}</p>
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