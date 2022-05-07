import { mount } from "@cypress/vue";
import HelloWorld from "../../src/components/HelloWorld.vue";

it("renders a message", () => {
  mount(HelloWorld, {
    propsData: {
      msg: "Hello Cypress!",
    },
  });

  cy.get("h1").contains("Hello Cypress!");
});
