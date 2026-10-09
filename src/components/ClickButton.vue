<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    label: string;
    onClick: (clickCount: number) => void;
}>();

const count = ref(0);

const handleClick = () => {
    count.value++;
    props.onClick(count.value);
};

</script>

<template>
    <button @click="handleClick">
        {{ label }} ({{ count }})
    </button>
</template>

<style scoped>
button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

button:hover {
    background-color: #0056b3;
}
</style>