import { VueWrapper } from "@vue/test-utils";

// Extend VueWrapper met getByDataTest method
declare module "@vue/test-utils" {
  interface VueWrapper {
    getByDataTest(selector: string): ReturnType<VueWrapper["find"]>;
  }
}

// Helper functie om elementen te vinden via data-test attribuut
VueWrapper.prototype.getByDataTest = function (selector: string) {
  return this.find(`[data-test="${selector}"]`);
};
