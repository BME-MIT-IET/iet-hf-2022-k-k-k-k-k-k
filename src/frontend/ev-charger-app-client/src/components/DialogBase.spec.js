import { mount } from "@cypress/vue";
import DialogBase from "./DialogBase.vue";
import vuetify from "../plugins/vuetify";
import Vuetify from "vuetify/lib";

//TODO ADD BEFORE ALL, CHECK TABLIST AND CHECK BUTTON CLICK
it("checks if dialog uses props and working properly", () => {
  mount(
    {
      vuetify,
      render(h) {
        return h(DialogBase, {
          props: {
            title: "Testing IET",
            cancelButtonAction: () => {},
            saveButtonAction: () => {},
            tabItems: ["1", "2", "3"],
          },
        });
      },
    },
    { extensions: { plugins: [Vuetify] } }
  );

  cy.wait(2000);

  cy.get(".v-card__title").contains("Testing IET");
});
