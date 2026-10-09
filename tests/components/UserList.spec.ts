import UserList from "@/components/UserList.vue";
import { shallowMount } from "@vue/test-utils";

type User = {
  id: number;
  name: string;
  email: string;
};

describe("UserList", () => {
  it("should render empty state with data-test attribute", () => {
    // Arrange: empty users prop
    const users: User[] = [];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.find("[data-test='user-list']").exists()).toBeFalsy();
    expect(wrapper.getByDataTest("empty-state").text()).toBe("No users found");
  });

  it("should render user list with data-test attribute", () => {
    // Arrange
    const users: User[] = [{ id: 101, name: "Jan", email: "jan@jansen.nl" }];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.find("[data-test='user-list']").exists()).toBe(true);
    expect(wrapper.find("[data-test='empty-state']").exists()).toBeFalsy();
  });

  it("should render user item with data-test attribute", () => {
    // Arrange
    const users: User[] = [{ id: 101, name: "Jan", email: "jan@jansen.nl" }];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.find("[data-test='user-item']").exists()).toBe(true);
    expect(wrapper.findAll("[data-test='user-item']")).toHaveLength(1);
  });

  it("should not render user id", () => {
    // Arrange
    const users: User[] = [{ id: 101, name: "Jan", email: "jan@jansen.nl" }];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(
      wrapper.getByDataTest("user-item").text().includes("101"),
    ).toBeFalsy();
  });

  it("should render user name with data-test attribute", () => {
    // Arrange
    const users: User[] = [{ id: 101, name: "Jan", email: "jan@jansen.nl" }];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.find("[data-test='user-name']").text()).toBe("Jan");
  });

  it("should render user email with data-test attribute", () => {
    // Arrange
    const users: User[] = [{ id: 101, name: "Jan", email: "jan@jansen.nl" }];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.find("[data-test='user-email']").text()).toBe(
      "jan@jansen.nl",
    );
  });

  it("should render multiple user items", () => {
    // Arrange
    const users: User[] = [
      { id: 101, name: "Jan", email: "jan@jansen.nl" },
      { id: 102, name: "Klaas", email: "klaas@klaassen.nl" },
    ];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.findAll("[data-test='user-item']")).toHaveLength(2);
  });

  it("should render user delete buttons with data-test attribute", () => {
    // Arrange
    const users: User[] = [
      { id: 101, name: "Jan", email: "jan@jansen.nl" },
      { id: 102, name: "Klaas", email: "klaas@klaassen.nl" },
    ];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });

    // Assert
    expect(wrapper.findAll("[data-test='delete-button']")).toHaveLength(2);
  });

  it("should delete correct user when delete-button is pressed", async () => {
    // Arrange
    const users: User[] = [
      { id: 101, name: "Jan", email: "jan@jansen.nl" },
      { id: 102, name: "Klaas", email: "klaas@klaassen.nl" },
    ];

    // Act
    const wrapper = shallowMount(UserList, {
      props: { users },
    });
    const deleteButton = wrapper.findAll('[data-test="delete-button"]')[0];
    await deleteButton.trigger("click");

    // Assert
    expect(wrapper.emitted("delete")?.[0]).toStrictEqual([101]);
  });
});
