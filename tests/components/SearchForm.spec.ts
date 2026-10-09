import { shallowMount } from "@vue/test-utils";
import SearchForm from "@/components/SearchForm.vue";

describe("SearchForm", () => {
  it("should show an empty input field", () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });

    // Act
    // Assert
    expect(wrapper.getByDataTest("search-input").text()).toBe("");
  });

  it("should show a submit button", () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });

    // Act
    // Assert
    expect(wrapper.getByDataTest("submit-button").text()).toBe("Zoeken");
  });

  it("should call onSubmit callback when form is submitted with a query", async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });
    const searchQuery = "Hoe pel je een banaan?";

    // Act
    await wrapper.getByDataTest("search-input").setValue(searchQuery);
    await wrapper.find("form").trigger("submit");

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledExactlyOnceWith(searchQuery);
  });

  it("should emit search query when form is submitted with a query", async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });
    const searchQuery = "Hoe pel je een banaan?";

    // Act
    await wrapper.getByDataTest("search-input").setValue(searchQuery);
    await wrapper.find("form").trigger("submit");

    // Assert
    expect(wrapper.emitted("search")?.[0]?.[0]).toStrictEqual(searchQuery);
  });

  it("should not submit when search-input is empty", async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });
    const searchQuery = "";

    // Act
    await wrapper.getByDataTest("search-input").setValue(searchQuery);
    await wrapper.find("form").trigger("submit");

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  it("should not submit when search-input has only whitespaces", async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });
    const searchQuery = "                           ";

    // Act
    await wrapper.getByDataTest("search-input").setValue(searchQuery);
    await wrapper.find("form").trigger("submit");

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit when query is a very long string", async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    const wrapper = shallowMount(SearchForm, {
      props: { onSubmit: mockOnSubmit },
    });
    const searchQuery = "abc".repeat(10_000);

    // Act
    await wrapper.getByDataTest("search-input").setValue(searchQuery);
    await wrapper.find("form").trigger("submit");

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledExactlyOnceWith(searchQuery);
  });
});

// werking submit button
// onsubmit callback
// search event
