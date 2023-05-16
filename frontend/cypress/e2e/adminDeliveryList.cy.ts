import "cypress-real-events/support";

describe("AdminDeliveryList component", () => {
  const url = "http://localhost:3000/admin/deliveries";
  context("when user is not authenticated", () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it("should redirect to the signIn page", () => {
      cy.url().should("include", "/");
    });
  });

  //   context("when user is authenticated but not admin", () => {
  //     beforeEach(() => {
  //       cy.loginAsNonAdmin();
  //       cy.visit("/admin/deliveries");
  //     });

  //     it("should redirect to the home page", () => {
  //       cy.url().should("not.include", "/admin/deliveries");
  //     });
  //   });

  context("when user is authenticated and admin", () => {
    beforeEach(() => {
      cy.setCookie(
        "JWT",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNlMDFkYWNkODQ4OGVkNWJlOGM2NjdlIiwiaWF0IjoxNjgwODQ2MzMwLCJleHAiOjE2ODM0MzgzMzB9.IsVRposYY48jOpchwZUEJW5i7xsba76XEylASqCjnKs"
      );
      cy.visit("http://localhost:3000");
      cy.wait(3000);
      cy.get(".menu-dropdown").realHover();

      cy.get("a").contains("Deliveries").click();

      // cy.visit(url);
    });

    it("should display the deliveries table", () => {
      cy.get("table").should("exist");
    });

    it("should display the correct columns in the deliveries table", () => {
      cy.get("thead > tr > th")
        // .should("have.length", 7)
        .then(($headers) => {
          expect($headers.eq(0)).to.contain("Sender");
          expect($headers.eq(1)).to.contain("Package ID");
          expect($headers.eq(2)).to.contain("Receiver");
          expect($headers.eq(3)).to.contain("Date");
          expect($headers.eq(4)).to.contain("Priority");
          expect($headers.eq(5)).to.contain("Price");
          expect($headers.eq(6)).to.contain("Status");
          expect($headers.eq(7)).to.contain("Pick Up Location");
          expect($headers.eq(8)).to.contain("Drop Off Location");
          expect($headers.eq(9)).to.contain("Distance");
        });
    });

    // it("should display the correct number of rows in the deliveries table", () => {
    //   cy.get("tbody > tr").should("have.length", 10);
    // });

    // it("should display the Edit button in the last column of each row", () => {
    //   cy.get("tbody > tr > td:last-child > button")
    //     // .should("have.length", 10)
    //     .each(($button) => {
    //       expect($button).to.contain("Edit");
    //     });
    // });

    it("should redirect to the admin edit form page when clicking on the Edit button of a row", () => {
      cy.get("tbody > tr").last().find("td").last().click();
      cy.url().should("eq", "http://localhost:3000/admin/editForm");
    });
  });
});
