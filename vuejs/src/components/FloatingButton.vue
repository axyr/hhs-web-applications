<script setup>

defineProps({
    label: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        default: '#0283ff',
    },
});

const emit = defineEmits(['click']);

const click = () => {
    emit('click');
};

</script>

<template>
    <button
        class="shadow"
        @click="click"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path fill="currentColor" d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" />
        </svg>
    </button>
</template>

<style scoped>

button {
    position: fixed;
    width: 5rem;
    height: 5rem;
    bottom: 2rem;
    right: 2rem;
    border-radius: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: v-bind(color);
}

svg {
    width: 80%;
    height: 80%;
    color: #ffffff;
}
</style>