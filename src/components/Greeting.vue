<script setup lang="ts">
defineProps<{
    name: string;
    emoji?: string;
}>();
</script>

<template>
    <h1>Hello, {{ name }}! <span id="emoji" v-if="emoji">{{ emoji }}</span></h1>
</template>