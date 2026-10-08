<script setup lang="ts">
defineProps<{
    status: 'success' | 'warning' | 'error' | string;
}>();
</script>

<template>
    <div class="status-badge">
        <div v-if="status === 'success'" class="badge badge-success">
            ✓ Gelukt
        </div>
        <div v-if="status === 'warning'" class="badge badge-warning">
            ⚠ Waarschuwing
        </div>
        <div v-if="status === 'error'" class="badge badge-error">
            ✗ Fout
        </div>
    </div>
</template>

<style scoped>
.badge {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
}

.badge-success {
    background-color: #d4edda;
    color: #155724;
}

.badge-warning {
    background-color: #fff3cd;
    color: #856404;
}

.badge-error {
    background-color: #f8d7da;
    color: #721c24;
}
</style>