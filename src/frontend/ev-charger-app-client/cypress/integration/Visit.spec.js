describe("ToltoSCH Happy Path", () => {
  // before each test, make sure to visit the home page of the app
  beforeEach(() => {
    cy.visit("/login"); // "baseUrl" is defined in cypress.json file
  });

  it("happy path", () => {
    cy.get('input[name="username"]').click({ force: true }).type("radikris");
    cy.get('input[name="password"]').click({ force: true }).type("asdasdasd");

    cy.get(".mdi-eye-off").click({ force: true });
    cy.wait(1000);

    cy.get(".mdi-brightness-4").click({ force: true });

    cy.wait(1000);

    cy.get(".v-btn.v-btn--rounded").click({ force: true });

    let fakeMockLocation;
    cy.fixture("location.json").as("fakeLocation");
    cy.get("@fakeLocation").then((fakeLocation) => {
      fakeMockLocation = fakeLocation;
    });
    cy.wait(1000);

    Cypress.Commands.add("mockGeolocation", (_) => {
      cy.window().then(($window) => {
        cy.stub(
          $window.navigator.geolocation,
          "getCurrentPosition",
          (callback) => {
            return callback(fakeMockLocation);
          }
        );
      });
    });
    cy.mockGeolocation();

    //TODO ADD FAKE STUB CHROME LOCATION ENABLING
    // cy.get("@fakeLocation").then((fakeLocation) => {
    //   cy.visit("/map", {
    //     onBeforeLoad(win) {
    //       cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
    //         (cb) => {
    //           return cb(fakeLocation);
    //         }
    //       );
    //     },
    //   });
    // });
    cy.wait(3500);
    cy.get('button[aria-label="Kicsinyítés"]').click({ force: true });
    cy.get('div[role="button"][tabindex="0"]').click({
      force: true,
    });

    cy.get("button").contains("details").click({ force: true });
    cy.wait(1000);

    cy.wait(2000);

    cy.get(".v-btn--fab").click({ force: true });
    cy.wait(1000);

    cy.get("button").contains("toggle all").click({ force: true });
    cy.wait(1000);
    cy.get(".v-app-bar__nav-icon").click({ force: true });
    cy.wait(1000);
    cy.get(".v-list-item__title").contains("Profile").click({ force: true });
    cy.wait(1000);

    cy.get("button").contains("cancel").click({ force: true });
    cy.wait(1000);

    cy.get(".v-app-bar__nav-icon").click({ force: true });
    cy.wait(1000);
    cy.get(".v-list-item__title").contains("Log out").click({ force: true });
    cy.wait(1000);
  });
});
