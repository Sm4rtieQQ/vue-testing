import { shallowMount } from "@vue/test-utils";
import LikeButton from "@/components/LikeButton.vue";

describe("likeButton", () => {
  it("should show no count if no count param is given", () => {
    // Arrange: mount het component zonder count
    const wrapper = shallowMount(LikeButton);

    // Act
    // Assert: controleer of weergegeven text klopt
    expect(wrapper.text()).toBe("🤍 Like");
  });

  it("should show count if count param is given", () => {
    // Arrange: mount het component met count
    const count = 3;
    const wrapper = shallowMount(LikeButton, { props: { count } });

    // Act
    // Assert: controleer of weergegeven text klopt
    expect(wrapper.text()).toBe("🤍 Like (" + count + ")");
  });

  it("should show Liked when button is clicked", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(LikeButton);

    // Act: click button
    await wrapper.find("button").trigger("click");

    // Assert: controleer of weergegeven text klopt
    expect(wrapper.text()).toBe("❤️ Liked");
  });

  it("should emit like when liked is false and like button is clicked", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(LikeButton);

    // Act: click button
    await wrapper.find("button").trigger("click");

    // Assert: controleer of 'like' is emitted
    expect(wrapper.emitted("like")?.[0]).toStrictEqual([]);
    expect(wrapper.emitted("like")).toHaveLength(1);
  });

  it("should emit unlike when liked is true and button is clicked", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(LikeButton);

    // Act: click button 2x
    await wrapper.find("button").trigger("click");
    await wrapper.find("button").trigger("click");

    // Assert: controleer of 'unlike' is emitted
    expect(wrapper.emitted("unlike")?.[0]).toStrictEqual([]);
    expect(wrapper.emitted("unlike")).toHaveLength(1);
  });

  it("should toggle between like and unlike on each click", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(LikeButton);

    // Act: click button 5x
    for (let i = 0; i < 5; i++) {
      await wrapper.find("button").trigger("click");
    }

    // Assert: controleer of 'like' en 'unlike' zijn emitted
    expect(wrapper.emitted("like")).toHaveLength(3);
    expect(wrapper.emitted("unlike")).toHaveLength(2);
  });

  it("should toggle text with each click", async () => {
    // Arrange: mount het component
    const wrapper = shallowMount(LikeButton);

    for (let i = 0; i < 3; i++) {
      // Assert
      expect(wrapper.text()).toBe("🤍 Like");

      // Act: click button
      await wrapper.find("button").trigger("click");

      // Assert: controleer of weergegeven text klopt
      expect(wrapper.text()).toBe("❤️ Liked");

      // Act: click button
      await wrapper.find("button").trigger("click");
    }
  });
});
