import { mount } from "@cypress/vue";
import HelloWorld from "../../src/components/HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders a message", () => {
    const msg = "Hello Cypress Component Testing!";
    mount(HelloWorld, {
      propsData: {
        msg,
      },
    });

    cy.get("h1").should("have.text", msg);
  });
});
