import { mount } from "@cypress/vue";
import DialogBase from "./DialogBase.vue";
import vuetify from "../plugins/vuetify";
import Vuetify from "vuetify/lib";

//TODO ADD BEFORE ALL, CHECK TABLIST AND CHECK BUTTON CLICK
//https://github.com/JessicaSachs/cypress-vuetify-component-test/blob/master/src/components/Carousel.spec.js
describe("DialogBase", () => {
  beforeEach(() => {
    mount(
      {
        vuetify,
        render(h) {
          return h(DialogBase, {
            props: {
              title: "Testing IET",
              cancelButtonAction: () => {},
              saveButtonAction: () => {
                alert("iet test");
              },
              tabItems: ["First", "Second", "Third"],
            },
          });
        },
      },
      { extensions: { plugins: [Vuetify] } }
    );

    cy.wait(1000);
  });

  it("checks if dialog uses title props", () => {
    cy.get(".v-card__title").contains("Testing IET");
  });
  it("checks if dialog uses tab props", () => {
    cy.get(".v-tabs-bar__content").contains("First");
    cy.get(".v-tabs-bar__content").contains("Second");
    cy.get(".v-tabs-bar__content").contains("Third");
  });
  it("checks if dialog proper save button", () => {
    // cy.get(".v-tabs-bar__content").contains("First");
    // cy.get(".v-tabs-bar__content").contains("Second");
    cy.get("button.primary--text").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal(`iet test`);
    });
    cy.wait(1000);
  });
});
