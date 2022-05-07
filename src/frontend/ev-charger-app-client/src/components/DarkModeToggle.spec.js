import { mount } from "@cypress/vue";
//import DarkModeToggle from "../../src/components/DarkModeToggle";
import DarkModeToggle from "./DarkModeToggle.vue";

describe("HelloWorld", () => {
  it("renders a message", () => {
    const msg = "Hello Cypress Component Testing!";
    mount(DarkModeToggle, {
      // propsData: {
      //   msg
      // }
    });

    //cy.get('h1').should('have.text', msg)
  });
});
