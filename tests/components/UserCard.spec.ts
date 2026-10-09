import { shallowMount } from "@vue/test-utils";
import UserCard from "@/components/UserCard.vue";

describe("UserCard", () => {
  it("should render user name with data-test attribute", () => {
    // Arrange
    const name = "John Doe";
    const email = "john@example.com";
    const role = "Developer";

    // Act
    const wrapper = shallowMount(UserCard, {
      props: { name, email, role },
    });

    // Assert
    expect(wrapper.getByDataTest("user-name").text()).toBe("John Doe");
  });

  it("should render user email with data-test attribute", () => {
    // Arrange
    const name = "Jane Smith";
    const email = "jane@example.com";
    const role = "Designer";

    // Act
    const wrapper = shallowMount(UserCard, {
      props: { name, email, role },
    });

    // Assert
    expect(wrapper.getByDataTest("user-email").text()).toBe("jane@example.com");
  });

  it("should render user role with data-test attribute", () => {
    // Arrange
    const name = "Alice Johnson";
    const email = "alice@example.com";
    const role = "Manager";

    // Act
    const wrapper = shallowMount(UserCard, {
      props: { name, email, role },
    });

    // Assert
    expect(wrapper.getByDataTest("user-role").text()).toBe("Role: Manager");
  });

  it("should have a delete button with data-test attribute", () => {
    // Arrange
    const name = "Bob Brown";
    const email = "bob@example.com";
    const role = "Tester";

    // Act
    const wrapper = shallowMount(UserCard, {
      props: { name, email, role },
    });

    // Assert
    expect(wrapper.getByDataTest("delete-button").exists()).toBe(true);
  });

  it("should emit delete event when delete button is clicked", async () => {
    // Arrange
    const name = "Charlie Davis";
    const email = "charlie@example.com";
    const role = "Admin";
    const wrapper = shallowMount(UserCard, {
      props: { name, email, role },
    });

    // Act
    await wrapper.getByDataTest("delete-button").trigger("click");

    // Assert
    expect(wrapper.emitted("delete")?.[0]).toStrictEqual([]);
  });
});
