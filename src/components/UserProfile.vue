<script setup lang="ts">
import { formatDate } from '@/helpers/formatDate';

type User = {
    name: string;
    email: string;
    createdAt: Date;
};

const props = defineProps<{
    user: User;
}>();

const formattedDate = formatDate(props.user.createdAt);
</script>

<template>
    <div class="user-profile">
        <h2>{{ user.name }}</h2>
        <p class="email">{{ user.email }}</p>
        <p class="created-at">
            Member since: {{ formattedDate }}
        </p>
    </div>
</template>

<style scoped>
.user-profile {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h2 {
    margin: 0 0 8px 0;
    color: #333;
}

.email {
    color: #666;
    margin: 4px 0;
}

.created-at {
    color: #999;
    font-size: 14px;
    margin: 8px 0 0 0;
}
</style>

