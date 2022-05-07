import { mount } from "@cypress/vue";
import DarkModeToggle from "./DarkModeToggle.vue";
import vuetify from "../plugins/vuetify";
import Vuetify from "vuetify/lib";

it("renders a message", () => {
  mount(
    {
      vuetify,
      render(h) {
        return h(DarkModeToggle);
      },
    },
    { extensions: { plugins: [Vuetify] } }
  );

  cy.get("button").should("have.class", "mdi-brightness-4");
  cy.getLocalStorage("DarkMode").should("eq", "false");

  cy.wait(2000);

  cy.get("button").click({ force: true });

  cy.getLocalStorage("DarkMode").should("eq", "true");

  cy.wait(2000);

  cy.get("button").should("have.class", "mdi-brightness-7");
});
