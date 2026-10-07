import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import Greeting from "../../src/components/Greeting.vue";

describe("Greeting", () => {
  it("should render the name prop", () => {
    // Arrange: Definieer de prop
    const name = "Vitest";

    // Act: Mount de component met shallowMount
    const wrapper = shallowMount(Greeting, { props: { name } });

    // Assert: Controleer of de naam wordt gerenderd
    expect(wrapper.text()).toContain("Hello, Vitest!");
  });
});
