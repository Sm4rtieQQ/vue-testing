import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld", () => {
  it("should mount without errors", () => {
    // Arrange: Definieer de props die de component verwacht
    const msg = "Hello Vitest";

    // Act: Mount de component (shallowMount is voldoende voor deze test)
    const wrapper = shallowMount(HelloWorld, { props: { msg } });

    // Assert: Controleer of de wrapper bestaat
    expect(wrapper.exists()).toBe(true);
  });
});
