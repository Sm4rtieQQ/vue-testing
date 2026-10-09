<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
    onSubmit: (query: string) => void;
}>();

const emit = defineEmits<{
    search: [query: string];
}>();

const query = ref('');

const handleSubmit = () => {
    if (query.value.trim() === '') {
        return;
    }

    props.onSubmit(query.value);
    emit('search', query.value);
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input
            v-model="query"
            type="text"
            placeholder="Zoek..."
            data-test="search-input"
        />
        <button type="submit" data-test="submit-button">
            Zoeken
        </button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    gap: 8px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

button {
    padding: 8px 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

button:hover {
    background-color: #218838;
}
</style>