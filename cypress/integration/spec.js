/// <reference types="cypress" />

// testataan aukeaako sovellus onnistuneesti
it("opens application successfully", () => {
  cy.visit("/");
  cy.contains("DuuniApp").should("be.visible");
});

// testataan hakeeko sovellus työpaikat onnistuneesti apista
it("loads jobs from backend api", () => {
  cy.log("**tunnistetaan api-fetch-kutsu**");
  cy.intercept({
    headers: { "API-KEY": "*" },
  }).as("jobs");
  cy.visit("/");
  cy.log("**varmistetaan että api on palauttanut työpaikkoja**");
  cy.wait("@jobs")
    .its("response.body")
    .should("be.an", "Array")
    .and("have.length.gt", 5)
    .then((jobs) => {
      cy.log("**navigoidaan listaussivulle**");
      cy.contains("Job results").click();
      cy.wait(5000); // odotetaan 5 sek koska github actions workflow on niin hidas että failaa muuten
      cy.get("[data-testid=job]").should("have.length", jobs.length);
    });
});

// loading-komponentti näkyy ennen kuin apikutsu on valmis
it("shows loading indicator", () => {
  // slow down the response by 1 second
  // https://on.cypress.io/intercept
  cy.intercept(
    {
      headers: { "API-KEY": "*" },
    },
    (req) => {
      // use bundled Bluebird library
      // which has utility method .delay
      // https://on.cypress.io/promise
      return Cypress.Promise.delay(1000).then(() => req.continue());
    }
  ).as("jobs");
  cy.visit("/");
  cy.contains("Job results").click();
  cy.get("[data-testid=loading]").should("be.visible");
  cy.get("[data-testid=loading]").should("not.exist");
  cy.wait("@jobs");
});
