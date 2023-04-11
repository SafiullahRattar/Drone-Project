describe("DeliveryTracking", () => {
  const url = "http://localhost:3000/tracking";
  it("should display delivery information when valid tracking ID is entered", () => {
    cy.visit(url);

    // Enter a valid tracking ID and submit the form
    cy.get("input").type("63e2c020aa5f34edc36189d0");
    cy.get("button[type='submit']").click();

    // Assert that the delivery information is displayed
    cy.get("table").should("be.visible");
    cy.contains("Sender");
    cy.contains("Package ID");
    cy.contains("Receiver");
    cy.contains("Date");
    cy.contains("Priority");
    cy.contains("Price");
    cy.contains("Status");
    cy.contains("Distance");
  });

  it("should display an error message when invalid tracking ID is entered", () => {
    cy.visit(url);

    // Enter an invalid tracking ID and submit the form
    cy.get("input").type("INVALIDTRACKINGID");
    cy.get("button[type='submit']").click();

    // Assert that an error message is displayed
    cy.get(".error").should("be.visible");
    cy.contains("ERROR");
  });
});
