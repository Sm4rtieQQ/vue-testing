import { shallowMount } from "@vue/test-utils";
import Counter from "../../src/components/Counter.vue";

describe("Counter", () => {
  it("should increment count when button is clicked", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(Counter);

    // Act: simuleer een click op de button
    await wrapper.find("button").trigger("click");

    // Assert: controleer of de count is verhoogd
    expect(wrapper.text()).toContain("Count: 1");
  });

  it("should emit increment event with correct value", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(Counter);

    // Act: simuleer een click op de button
    await wrapper.find("button").trigger("click");

    // Assert: controleer of het increment event is uitgezonden
    expect(wrapper.emitted("increment")?.[0]).toStrictEqual([1]);
  });

  it("should increment each time when button is clicked", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(Counter);
    const testAmount = 3;

    // Act: simuleer drie clicks op de button
    for (let i = 0; i < testAmount; i++) {
      await wrapper.find("button").trigger("click");
    }

    // Assert: controleer of de count is verhoogd met testAmount
    expect(wrapper.text()).toContain("Count: " + testAmount);
  });

  it("should emit increment event each time with correct value", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(Counter);

    // Act: simuleer een click op de button
    for (let i = 0; i < 3; i++) {
    await wrapper.find("button").trigger("click");
    }

    // Assert: het event moet 3x zijn uitgezonden
    expect(wrapper.emitted('increment')).toHaveLength(3);

    // Assert: de payloads moeten 1, 2, 3 zijn
    expect(wrapper.emitted("increment")?.[0]).toStrictEqual([1]);
    expect(wrapper.emitted("increment")?.[1]).toStrictEqual([2]);
    expect(wrapper.emitted("increment")?.[2]).toStrictEqual([3]);
  });

  it("should always have an initial value of 0", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(Counter);

    // Assert: de count waarde moet 0 zijn
    expect(wrapper.text()).toContain("Count: 0");
  });
});
