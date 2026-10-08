<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const count = ref(0);

const emit = defineEmits<{
    increment: [value: number];
}>();

const increment = () => {
    count.value++;
    emit('increment', count.value);
};
</script>