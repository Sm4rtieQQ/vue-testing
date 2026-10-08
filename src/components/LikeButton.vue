<template>
    <button @click="toggleLike" class="like-button">
        <span v-if="liked">❤️ Liked</span>
        <span v-else>🤍 Like</span>
        <span v-if="count !== undefined"> ({{ count }})</span>
    </button>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
    count?: number;
}>();

const emit = defineEmits<{
    like: [];
    unlike: [];
}>();

const liked = ref(false);

const toggleLike = () => {
    liked.value = !liked.value;

    if (liked.value) {
        emit('like');
    } else {
        emit('unlike');
    }
};
</script>

<style scoped>
.like-button {
    padding: 8px 16px;
    border: 2px solid #e1e8ed;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
}

.like-button:hover {
    border-color: #1da1f2;
    background: #f7f9fa;
}
</style>