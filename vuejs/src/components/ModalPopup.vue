<script setup>

import {computed, onMounted, ref} from 'vue';
import {useGlobalStore} from '@/stores/global.js';

const globalStore = useGlobalStore();

const color = computed(() => globalStore.activeCollection ? globalStore.activeCollection.brandColor : '#0283ff');

const props = defineProps({
    showConfirm: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Modal popup',
    },
    confirmText: {
        type: String,
        default: 'Yes',
    },
    cancelText: {
        type: String,
        default: 'No',
    },
    width: {
        type: String,
        default: '400px',
    },
    height: {
        type: String,
        default: '400px',
    }
});

const emit = defineEmits(['close', 'confirm']);

function close() {
    emit('close');
}

function confirm() {
    emit('confirm');
}

onMounted(() => {
    window.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
            close();
        }
    });
});
</script>

<template>
    <label for="modal" class="modal-background" @click="close"></label>
    <div class="modal shadow rounded bg-white">
        <div class="modal-header shadow">
            <h3>{{ props.title }}</h3>
            <label for="modal" @click="close">
                <img @click="close" src="/assets/img/times-circle.svg" alt="Close" width="16" height="16" />
            </label>
        </div>
        <div class="modal-content">
            <slot name="body"></slot>
        </div>
        <div class="modal-footer">
            <button v-if="showConfirm" @click="confirm" class="confirm">{{ props.confirmText }}</button>
            <button v-if="showConfirm" @click="close">{{ props.cancelText }}</button>
        </div>
    </div>
</template>

<style scoped>

.modal-background {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    z-index: 9998;
}

.modal {
    width: v-bind(width);
    height: v-bind(height);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: block;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 9999;
}

.modal-header {
    border-bottom: 1px solid #dddddd;
    box-sizing: border-box;
    height: 50px;
}

.modal-header h3 {
    margin: 0;
    box-sizing: border-box;
    padding-left: 15px;
    line-height: 50px;
    color: #4d4d4d;
    font-size: 16px;
    display: inline-block;
}

.modal-header label {
    box-sizing: border-box;
    float: right;
    line-height: 50px;
    padding: 3px 15px 0 15px;
    cursor: pointer;
}

.modal-header label:hover img {
    opacity: 0.6;
}

.modal-content {
    padding: 1rem;
}

.modal-footer {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: space-between;
}


button.confirm {
    background-color: v-bind(color);
    color: #fff;
}
</style>