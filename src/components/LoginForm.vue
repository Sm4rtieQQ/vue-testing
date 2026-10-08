<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="email">Email:</label>
            <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Vul je email in"
            />
        </div>

        <div>
            <label for="password">Wachtwoord:</label>
            <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Vul je wachtwoord in"
            />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit">Inloggen</button>
    </form>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');

const emit = defineEmits<{
    submit: [data: {email: string; password: string}];
}>();

const handleSubmit = () => {
    // Reset error
    error.value = '';

    // Validatie
    if (!email.value || !password.value) {
        error.value = 'Vul alle velden in';
        return;
    }

    // Emit submit event met data
    emit('submit', {
        email: email.value,
        password: password.value,
    });
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>