/// <reference types="cypress" />

// testataan aukeaako sovellus onnistuneesti
it("opens application successfully", () => {
  cy.visit("/");
  cy.contains("DuuniApp").should("be.visible");
});

// testataan hakeeko sovellus työpaikat onnistuneesti apista
it("loads jobs from backend api", () => {
  cy.log("**identifying api-fetch call**");
  cy.intercept({
    headers: { "API-KEY": "*" },
  }).as("jobs");
  cy.visit("/");
  cy.log("**making sure that api has returned jobs**");
  cy.wait("@jobs")
    .its("response.body")
    .should("be.an", "Array")
    .and("have.length.gt", 5)
    .then((jobs) => {
      cy.log("**navigating to job listing page**");
      cy.contains("Job results").click();
      cy.wait(8000); // odotetaan 8 sek koska github actions workflow on niin hidas että failaa muuten
      cy.get("[data-testid=job]").should("have.length", jobs.length);
    });
});

// loading-komponentti näkyy ennen kuin apikutsu on valmis
it("shows loading indicator", () => {
  cy.intercept(
    {
      headers: { "API-KEY": "*" },
    },
    (req) => {
      // hidastetaan kutsua 1 sek jotta loading ehditään nähdä
      return Cypress.Promise.delay(1000).then(() => req.continue());
    }
  ).as("jobs");
  cy.visit("/");
  cy.contains("Job results").click();
  cy.get("[data-testid=loading]").should("be.visible");
  cy.get("[data-testid=loading]").should("not.exist");
  cy.wait("@jobs");
});

// checkboxin klikkaus toimii
it("checks and unchecks a checkbox", () => {
  cy.visit("/");
  cy.log("**making sure text above checkboxes is visible**");
  cy.contains("Show jobs from selected companies:").should("be.visible");
  cy.log("**trying to check first checkbox**");
  cy.get('[data-testid="checkbox"]')
    .first()
    .should("be.visible") // checkbox näkyy
    .trigger("mouseover")
    .click()
    .should("have.attr", "aria-checked", "false"); // checkboxin uncheckaus onnistuu
});

// tagin lisäys onnistuu enterillä
it("submits a tag with enter", () => {
  cy.visit("/");
  cy.get('input[type="text"]')
    .first() // yestags-tekstikenttä
    .should("be.visible") // näkyykö tekstikenttä
    .type("developer{enter}");
  cy.contains("developer").should("be.visible"); // tagi näkyy
});

// tagin lisäys onnistuu nappia painamalla
it("submits a tag with plus button press", () => {
  cy.visit("/");
  cy.get('input[type="text"]')
    .first() // yestags-tekstikenttä
    .should("be.visible") // näkyykö tekstikenttä
    .type("developer");
  cy.get('[data-testid="yestag-button"]').click(); // klikataan plussaa
  cy.contains("developer").should("be.visible"); // tagi näkyy
});

// paikkakunnan lisäys onnistuu & työpaikat filtteröityvät
it("submits a location and filters jobs accordingly", () => {
  cy.visit("/");
  cy.get('input[type="text"]')
    .last() // locations-tekstikenttä
    .should("be.visible")
    .type("oulu{enter}");
  cy.contains("oulu").should("be.visible"); // oulu-tagi näkyy
  cy.contains("Job results").click();
  cy.contains("Helsinki").should("not.exist"); // ei helsinki-työpaikkoja
});

// tagin poisto onnistuu
it("deletes a tag", () => {
  cy.visit("/");
  cy.get('input[type="text"]')
    .eq(1) // notags-tekstikenttä
    .should("be.visible") // näkyykö tekstikenttä
    .type("python{enter}");
  cy.contains("python").should("be.visible").click().should("not.exist");
});

// palauttaa no results found, jos sopivia työpaikkoja ei löydy
it("shows no jobs if there are no matches for keyword", () => {
  cy.visit("/");
  cy.get('input[type="text"]')
    .first() // yestags-tekstikenttä
    .should("be.visible") // näkyykö tekstikenttä
    .type("thistagdoesnotexist!!!!!{enter}");
  cy.contains("thistagdoesnotexist!!!!!").should("be.visible"); // tagi näkyy
  cy.contains("Job results").click();
  cy.contains("No data found").should("be.visible");
});
