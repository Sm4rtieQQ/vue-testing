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
                placeholder="Minimaal 8 karakters"
            />
        </div>

        <div>
            <label for="confirmPassword">Bevestig wachtwoord:</label>
            <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                placeholder="Herhaal je wachtwoord"
            />
        </div>

        <div>
            <label>
                <input
                    id="acceptTerms"
                    v-model="acceptTerms"
                    type="checkbox"
                />
                Ik accepteer de voorwaarden
            </label>
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit">Registreren</button>
    </form>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const error = ref('');

const emit = defineEmits<{
    submit: [data: {
        email: string;
        password: string;
        confirmPassword: string;
        acceptTerms: boolean;
    }];
}>();

const handleSubmit = () => {
    // Reset error
    error.value = '';

    // Validatie: alle velden moeten ingevuld zijn
    if (!email.value || !password.value || !confirmPassword.value) {
        error.value = 'Vul alle velden in';
        return;
    }

    // Validatie: wachtwoord minimaal 8 karakters
    if (password.value.length < 8) {
        error.value = 'Wachtwoord moet minimaal 8 karakters zijn';
        return;
    }

    // Validatie: wachtwoorden moeten overeenkomen
    if (password.value !== confirmPassword.value) {
        error.value = 'Wachtwoorden komen niet overeen';
        return;
    }

    // Validatie: voorwaarden moeten geaccepteerd zijn
    if (!acceptTerms.value) {
        error.value = 'Je moet de voorwaarden accepteren';
        return;
    }

    // Emit submit event met data
    emit('submit', {
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        acceptTerms: acceptTerms.value,
    });
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="checkbox"] {
    margin-right: 8px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>