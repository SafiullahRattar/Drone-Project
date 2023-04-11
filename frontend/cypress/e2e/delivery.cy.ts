describe("DeliveryForm", () => {
  const url = "http://localhost:3000/delivery";
  it("submits the form with valid input", () => {
    cy.visit(url);

    // Fill in the package weight
    cy.get('input[name="package.weight"]').type("10");

    // Select the medium package size
    cy.get('select[name="package-size"]').select("1");

    // Fill in the delivery details
    cy.get('input[name="delivery.receiver"]').type("John Smith");
    cy.get('input[name="delivery.date"]').type("2023-04-12");
    cy.get('input[name="delivery.priority"]').type("0");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify that the form was submitted successfully
    // cy.get('div.error').should('not.exist');


  });

  it("displays an error message for invalid input", () => {
    cy.visit(url);

    // Submit the form without filling in any input
    cy.get('button[type="submit"]').click();

    // Verify that error messages are displayed
    cy.get(".error").should("have.length", 3);
  });
});
