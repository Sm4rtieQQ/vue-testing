<script setup lang="ts">
defineProps<{
    name: string;
    email: string;
    role: string;
}>();

const emit = defineEmits<{
    delete: [];
}>();

const handleDelete = () => {
    emit('delete');
};
</script>

<template>
    <div class="user-card">
        <h3 data-test="user-name">{{ name }}</h3>
        <p data-test="user-email">{{ email }}</p>
        <p data-test="user-role">Role: {{ role }}</p>
        <button data-test="delete-button" @click="handleDelete">
            Delete
        </button>
    </div>
</template>

<style scoped>
.user-card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
}

button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>