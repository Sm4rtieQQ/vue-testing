export type WeatherData = {
  temperature: number;
  description: string;
};

/**
 * Fetches weather data for a given city (mocked API call)
 * @param city - The city name
 * @returns Promise with weather data
 */
export async function fetchWeather(city: string): Promise<WeatherData> {
  // In a real app, this would make an actual API call
  // For this exercise, we'll simulate an API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Simulate API response
  return {
    temperature: Math.floor(Math.random() * 30) + 10,
    description: ["Sunny", "Cloudy", "Rainy", "Windy"][
      Math.floor(Math.random() * 4)
    ],
  };
}
