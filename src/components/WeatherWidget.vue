<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {fetchWeather, type WeatherData} from '../helpers/fetchWeather';

const props = defineProps<{
    city: string;
}>();

const loading = ref(true);
const error = ref<string | null>(null);
const weather = ref<WeatherData | null>(null);

onMounted(async () => {
    try {
        loading.value = true;
        error.value = null;
        weather.value = await fetchWeather(props.city);
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch weather';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="weather-widget">
        <h3>Weather in {{ city }}</h3>

        <div v-if="loading" class="loading">
            Loading weather...
        </div>

        <div v-else-if="error" class="error">
            Error: {{ error }}
        </div>

        <div v-else-if="weather" class="weather-data">
            <p class="temperature">{{ weather.temperature }}°C</p>
            <p class="description">{{ weather.description }}</p>
        </div>

        <div v-else class="empty">
            No weather data available
        </div>
    </div>
</template>

<style scoped>
.weather-widget {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background-color: #f5f5f5;
    max-width: 300px;
}

h3 {
    margin: 0 0 12px 0;
    color: #333;
}

.loading {
    color: #666;
    font-style: italic;
}

.error {
    color: #dc3545;
    font-weight: bold;
}

.weather-data {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.temperature {
    font-size: 32px;
    font-weight: bold;
    color: #007bff;
    margin: 0;
}

.description {
    font-size: 18px;
    color: #666;
    margin: 0;
}

.empty {
    color: #999;
}
</style>