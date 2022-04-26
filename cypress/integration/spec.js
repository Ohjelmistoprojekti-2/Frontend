/// <reference types="cypress" />

it("opens application successfully", () => {
  cy.visit("/");
  cy.contains("DuuniApp").should("be.visible");
});

it("loads jobs from backend api", () => {
  cy.intercept({
    headers: { "API-KEY": "*" },
  }).as("jobs");
  cy.visit("/Results");
  cy.wait("@jobs")
    .its("response.body")
    .should("be.an", "Array")
    .and("have.length.gt", 5)
    .then((jobs) => {
      cy.contains("Job results").click();
      cy.get("[data-testid=job]").should("have.length", jobs.length);
    });
});
