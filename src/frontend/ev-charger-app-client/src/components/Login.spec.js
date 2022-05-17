import { mount } from "@cypress/vue";
import Login from "../pages/Login.vue";
import vuetify from "../plugins/vuetify";
import Vuetify from "vuetify/lib";

describe("Login", () => {
  beforeEach(() => {
    mount(
      {
        vuetify,
        render(h) {
          return h(Login);
        },
      },
      { extensions: { plugins: [Vuetify] } }
    );

    cy.wait(1000);
  });

  it("typing is working", () => {
    cy.wait(500);
    //.v-input__icon
    cy.get("#v_username").first().type("iet test");
    cy.get("#v_password").type("123456");

    cy.get(".v-icon.v-icon").click({ force: true });
    cy.wait(1000);

    cy.get("#v_password").should("have.value", "123456");
  });
  it("empty username error", () => {
    cy.wait(500);
    cy.get("#v_username").first().type("iet test");
    cy.get(".v-btn.v-btn--rounded").click();

    cy.get(".v-snack").contains(
      "Please enter your valid username and password"
    );
    cy.wait(1000);
  });
  it("empty password error", () => {
    cy.wait(500);
    cy.get("#v_password").type("123456");
    cy.get(".v-btn.v-btn--rounded").click();

    cy.get(".v-snack").contains(
      "Please enter your valid username and password"
    );
    cy.wait(1000);
  });
  it("login failed error", () => {
    cy.wait(500);
    cy.get("#v_username").first().type("iet test");
    cy.get("#v_password").type("123456");
    cy.get(".v-btn.v-btn--rounded").click();

    cy.get(".v-snack").contains(
      "Failed login in: enter your valid username and password"
    );
    cy.wait(1000);
  });
});
