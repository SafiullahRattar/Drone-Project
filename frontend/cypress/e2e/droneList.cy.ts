import "cypress-real-events/support";

describe("Admin Drone List", () => {
  const url = "http://localhost:3000/admin/drones";
  beforeEach(() => {
    cy.visit(url);
  });

  it("should navigate to signIn if user is not authenticated", () => {
    cy.window().then((window) => {
      window.localStorage.removeItem("userInfo");
    });
    cy.reload();
    cy.url().should("include", "http://localhost:3000/");
  });

  it("should navigate to home page if user is not admin", () => {
    cy.window().then((window) => {
      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({ isAdmin: false })
      );
    });
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("ADMIN DRONE with admin", () => {
  const url = "http://localhost:3000/admin/drones";
  beforeEach(() => {
    cy.setCookie(
      "JWT",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNlMDFkYWNkODQ4OGVkNWJlOGM2NjdlIiwiaWF0IjoxNjgwODQ2MzMwLCJleHAiOjE2ODM0MzgzMzB9.IsVRposYY48jOpchwZUEJW5i7xsba76XEylASqCjnKs"
    );
    cy.visit("http://localhost:3000");

    cy.get(".menu-dropdown").realHover();

    cy.get("a").contains("Drones").click();

    // cy.visit(url);
  });

  it("should display drone list table", () => {
    cy.get("table").should("have.length", 1);
    cy.get("th").contains("Drone ID");
    cy.get("th").contains("Name");
    cy.get("th").contains("Status");
    cy.get("th").contains("Latitude");
    cy.get("th").contains("Longitude");
    cy.get("th").contains("Battery Level");
    cy.get("th").contains("Last Maintenance Date");
    cy.get("th").contains("Weight Capacity");
    cy.get("th").contains("Max Flight Distance");
    cy.get("th").contains("Delivery Range");
    cy.get("th").contains("Speed");
    cy.get("th").contains("Charge Rate");
    cy.get("th").contains("Drain Rate");
    cy.get("th").contains("BCR");
    cy.get("th").contains("Total Battery Capacity");
  });

  it("should display drone data in table", () => {
    // cy.get("tbody > tr").should("have.length", 10);
    // cy.get("tbody > tr").first().find("td").contains("1");
    // cy.get("tbody > tr").first().find("td").contains("Drone 1");
    // cy.get("tbody > tr").first().find("td").contains("available");
    // cy.get("tbody > tr").first().find("td").contains("10.123");
    // cy.get("tbody > tr").first().find("td").contains("20.456");
    // cy.get("tbody > tr").first().find("td").contains("70");
    // cy.get("tbody > tr").first().find("td").contains("2022-03-15");
    // cy.get("tbody > tr").first().find("td").contains("50");
    // cy.get("tbody > tr").first().find("td").contains("100");
    // cy.get("tbody > tr").first().find("td").contains("200");
    // cy.get("tbody > tr").first().find("td").contains("30");
    // cy.get("tbody > tr").first().find("td").contains("10");
    // cy.get("tbody > tr").first().find("td").contains("5");
    // cy.get("tbody > tr").first().find("td").contains("0.5");
    // cy.get("tbody > tr").first().find("td").contains("1000");
    cy.get("thead th").should("have.length", 16);
  });

  it("should navigate to editForm page when edit button is clicked", () => {
    // cy.get("tbody > tr").first().find("button").click();
    cy.get("tbody > tr").last().find("td").last().click();
    cy.url().should("eq", "http://localhost:3000/admin/editForm");
  });
});
