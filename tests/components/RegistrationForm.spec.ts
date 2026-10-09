import { shallowMount } from "@vue/test-utils";
import RegistrationForm from "@/components/RegistrationForm.vue";

type submitPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const textValue = (input: any) => {
  return (input.element as HTMLInputElement).value;
};

const checkboxValue = (input: any) => {
  return (input.element as HTMLInputElement).checked;
};

describe("RegistrationForm - initial state", () => {
  it("should have empty input fields when mounted", () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    // Act
    // Assert
    expect(textValue(emailInput)).toBe("");
    expect(textValue(passwordInput)).toBe("");
    expect(textValue(confirmPasswordInput)).toBe("");
  });

  it("should have unchecked checkbox when mounted", () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const acceptTermsInput = wrapper.find("#acceptTerms");

    // Act
    // Assert
    expect(checkboxValue(acceptTermsInput)).toBe(false);
  });

  it("should have no errors when mounted", () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    // Act
    // Assert
    expect(wrapper.find("#errors").exists()).toBe(false);
  });
});

describe("RegistrationForm - validation", () => {
  it("should show an error when email field is empty", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("");
    await passwordInput.setValue("secret123");
    await confirmPasswordInput.setValue("secret123");
    await button.trigger("submit");

    // Assert
    expect(textValue(emailInput)).toBe("");
    expect(wrapper.text()).toContain("Vul alle velden in");
  });

  it("should show an error when password field is empty", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("");
    await confirmPasswordInput.setValue("secret123");
    await button.trigger("submit");

    // Assert
    expect(textValue(passwordInput)).toBe("");
    expect(wrapper.text()).toContain("Vul alle velden in");
  });

  it("should show an error when confirmPassword field is empty", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("secret123");
    await confirmPasswordInput.setValue("");
    await button.trigger("submit");

    // Assert
    expect(textValue(confirmPasswordInput)).toBe("");
    expect(wrapper.text()).toContain("Vul alle velden in");
  });

  it("should show an error when password lenght < 8", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("scrt123");
    await confirmPasswordInput.setValue("scrt123");
    await button.trigger("submit");

    // Assert
    expect(wrapper.text()).toContain(
      "Wachtwoord moet minimaal 8 karakters zijn",
    );
  });

  it("should show an error when passwords don't match", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("sicrit456");
    await confirmPasswordInput.setValue("secret123");
    await button.trigger("submit");

    // Assert
    expect(wrapper.text()).toContain("Wachtwoorden komen niet overeen");
  });

  it("should show an error when terms aren't accepted", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");
    const acceptTermsInput = wrapper.find("#acceptTerms");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("secret123");
    await confirmPasswordInput.setValue("secret123");
    await acceptTermsInput.setChecked(false);
    await button.trigger("submit");

    // Assert
    expect(wrapper.text()).toContain("Je moet de voorwaarden accepteren");
  });
});

describe("RegistrationForm - submission", () => {
  it("should emit data after succesful validation", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const emailInput = wrapper.find("#email");
    const passwordInput = wrapper.find("#password");
    const confirmPasswordInput = wrapper.find("#confirmPassword");
    const acceptTermsInput = wrapper.find("#acceptTerms");

    const button = wrapper.find("button");

    // Act
    await emailInput.setValue("email@example.com");
    await passwordInput.setValue("secret123");
    await confirmPasswordInput.setValue("secret123");
    await acceptTermsInput.setChecked(true);
    await button.trigger("submit");

    // Assert
    const emittedData = () =>
      wrapper.emitted("submit")?.[0]?.[0] as submitPayload;

    expect(wrapper.emitted("submit")).toHaveLength(1);
    expect(emittedData().email).toStrictEqual("email@example.com");
    expect(emittedData().password).toStrictEqual("secret123");
    expect(emittedData().confirmPassword).toStrictEqual("secret123");
    expect(emittedData().acceptTerms).toStrictEqual(true);
  });

  it("should not emit data when validation fails", async () => {
    // Arrange
    const wrapper = shallowMount(RegistrationForm);

    const button = wrapper.find("button");

    // Act
    await button.trigger("submit");

    // Assert
    expect(wrapper.emitted("submit")).toBeUndefined();
  });
});
