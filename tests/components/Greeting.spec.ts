import { shallowMount } from "@vue/test-utils";
import Greeting from "@/components/Greeting.vue";

describe("Greeting", () => {
  it("should render the name prop", () => {
    // Arrange: Definieer de prop
    const name = "Vitest";

    // Act: Mount de component met shallowMount
    const wrapper = shallowMount(Greeting, { props: { name } });

    // Assert: Controleer of de naam wordt gerenderd
    expect(wrapper.text()).toContain("Hello, Vitest!");
  });

  it("should render the emoji prop", () => {
    // Arrange
    const name = "Vitest"
    const emoji = "🤓☝️"

    // Act
    const wrapper = shallowMount(Greeting, { props: {name, emoji}});

    // Assert
    expect(wrapper.text()).toContain("Hello, Vitest! 🤓☝️");
    expect(wrapper.find('#emoji').exists()).toBe(true);
  })

  it("should not render the emoji element when prop is not given", () => {
    // Arrange
    const name = "Vitest";

    // Act
    const wrapper = shallowMount(Greeting, {props: {name}});

    // Assert
    expect(wrapper.text()).toContain("Hello, Vitest!");
    expect(wrapper.find('#emoji').exists()).toBe(false);
  })
});
