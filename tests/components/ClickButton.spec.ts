import { shallowMount } from "@vue/test-utils";
import ClickButton from "@/components/ClickButton.vue";

describe("ClickButton", () => {
  it("should call onClick callback when button is clicked", async () => {
    // Arrange: maak een mockfunctie en mount component
    const mockOnClick = vi.fn();
    const wrapper = shallowMount(ClickButton, {
      props: {
        label: "Click me",
        onClick: mockOnClick,
      },
    });

    // Act: simuleer een click
    await wrapper.find("button").trigger("click");

    // Assert: controleer dat de callback is aangeroepen
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should call onClick with incremented count", async () => {
    // Arrange: maak een mockfunctie en mount component
    const mockOnClick = vi.fn();
    const wrapper = shallowMount(ClickButton, {
      props: {
        label: "Click me",
        onClick: mockOnClick,
      },
    });

    // Act: simuleer een click
    await wrapper.find("button").trigger("click");

    // Assert: controleer dat de callback is aangeroepen met count 1
    expect(mockOnClick).toHaveBeenCalledWith(1);

    // Act: simuleer nog een click
    await wrapper.find("button").trigger("click");

    // Assert: controleer dat de callback nu is aangeroepen met count 2
    expect(mockOnClick).toHaveBeenCalledWith(2);
  });
});
