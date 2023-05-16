describe("Header component", () => {
  const url = "http://localhost:3000/";
  beforeEach(() => {
    cy.visit(url);
  });

  it("displays the logo", () => {
    cy.get(".logo").should("contain.text", "DDS");
  });

  it("navigates to tracking page when 'Track' is clicked", () => {
    cy.get("a").contains("Track").click();
    cy.url().should("include", "/tracking");
  });

  it("navigates to delivery page when 'Send Package' is clicked", () => {
    cy.get("a").contains("Send Package").click();
    cy.url().should("include", "/delivery");
  });

  it("navigates to Sign UP page page when 'Profile' is clicked", () => {
    cy.get("a").contains("Profile").click();
    cy.url().should("include", "/signUp");
  });

  it("displays 'Admin' dropdown when user is an admin", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "USER_DETAIL_SUCCESS",
      payload: { isAdmin: true },
    });
    cy.get(".menu-dropdown").should("exist");
  });

  it("displays 'Register' button when user is not signed in", () => {
    cy.get("button").contains("Register").should("exist");
  });

  it("displays 'Sign Out' button when user is signed in", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "USER_DETAIL_SUCCESS",
      payload: { email: "test@example.com" },
    });
    cy.get("button").contains("Sign Out").should("exist");
  });

  it("signs out the user when 'Sign Out' button is clicked", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "USER_DETAIL_SUCCESS",
      payload: { email: "test@example.com" },
    });
    cy.get("button").contains("Sign Out").click();
    cy.url().should("equal", "http://localhost:3000/");
  });
});
