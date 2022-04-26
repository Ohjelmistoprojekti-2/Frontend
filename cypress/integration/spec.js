/// <reference types="cypress" />

it("opens application successfully", () => {
  cy.visit("/");
  cy.contains("DuuniApp").should("be.visible");
});
