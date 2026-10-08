<script setup lang="ts">
defineProps<{
    status: 'loggedIn' | 'loggedOut' | 'loading';
}>();
</script>

<template>
    <div class="login-status">
        <div v-if="status === 'loggedIn'" class="welcome">
            ✓ Welkom! Je bent ingelogd
        </div>
        <div v-else-if="status === 'loggedOut'" class="logged-out">
            ⚠ Niet ingelogd
        </div>
        <div v-else class="loading">
            ⏳ Laden...
        </div>
    </div>
</template>

<style scoped>
.login-status > div {
    padding: 12px 20px;
    border-radius: 4px;
    font-weight: 500;
}

.welcome {
    background-color: #d4edda;
    color: #155724;
}

.logged-out {
    background-color: #fff3cd;
    color: #856404;
}

.loading {
    background-color: #d1ecf1;
    color: #0c5460;
}
</style>