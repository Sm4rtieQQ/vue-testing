import { flushPromises, shallowMount } from "@vue/test-utils";
import WeatherWidget from "@/components/WeatherWidget.vue";
import { fetchWeather } from "@/helpers/fetchWeather";

vi.mock("@/helpers/fetchWeather", () => ({
  fetchWeather: vi.fn(),
}));

describe("WeatherWidget", () => {
  it("should show only loading when mounted", () => {
    // Arrange
    const city = "groningen";
    const wrapper = shallowMount(WeatherWidget, { props: { city } });

    // Act
    // Assert
    expect(wrapper.find(".loading").text()).toBe("Loading weather...");
    expect(wrapper.find(".error").exists()).toBe(false);
    expect(wrapper.find(".weather-data").exists()).toBe(false);
  });

  it("should resolve with mocked data", async () => {
    // Arrange
    vi.mocked(fetchWeather).mockResolvedValue({
      temperature: 20,
      description: "Sunny",
    });
    const city = "Groningen";

    // Act
    const weather = await fetchWeather(city);

    // Assert
    expect(weather).toEqual({
      temperature: 20,
      description: "Sunny",
    });
    expect(fetchWeather).toHaveBeenCalledExactlyOnceWith("Groningen");
  });

  it("should show weather data after API call", async () => {
    // Arrange
    vi.mocked(fetchWeather).mockResolvedValue({
      temperature: 20,
      description: "Sunny",
    });
    const city = "Groningen";
    const wrapper = shallowMount(WeatherWidget, { props: { city } });

    // Act
    await fetchWeather(city);
    await flushPromises();

    // Assert
    expect(wrapper.find(".weather-data").exists()).toBe(true);
    expect(wrapper.find(".temperature").text()).toBe("20°C");
    expect(wrapper.find(".description").text()).toBe("Sunny");
  });
});
