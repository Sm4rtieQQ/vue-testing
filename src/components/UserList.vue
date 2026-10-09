<script setup lang="ts">
type User = {
    id: number;
    name: string;
    email: string;
};

defineProps<{
    users: User[];
}>();

const emit = defineEmits<{
    delete: [id: number];
}>();

const handleDelete = (id: number) => {
    emit('delete', id);
};
</script>

<template>
    <div class="user-list">
        <ul v-if="users.length > 0" data-test="user-list">
            <li v-for="user in users" :key="user.id" data-test="user-item">
                <span data-test="user-name">{{ user.name }}</span>
                <span data-test="user-email">{{ user.email }}</span>
                <button data-test="delete-button" @click="handleDelete(user.id)">
                    Delete
                </button>
            </li>
        </ul>
        <p v-else data-test="empty-state">
            No users found
        </p>
    </div>
</template>

<style scoped>
.user-list {
    padding: 16px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 8px;
}

button {
    margin-left: auto;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}
</style>