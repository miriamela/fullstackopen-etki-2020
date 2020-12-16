/* eslint-disable prettier/prettier */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: " Alberto Marti",
      username: "albertomarti",
      password: "password123",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Login");
  });
  describe("Login", function () {
    it("succeed with correct credential", function () {
      cy.contains("Login");
      cy.get("#username").type("albertomarti");
      cy.get("#password").type("password123");
      cy.get("#loginButton").click();
      cy.contains("Alberto Marti logged in");
    });
    it("fails with wrong credentials", function () {
      cy.contains("Login");
      cy.get("#username").type("miriamgrossi");
      cy.get("#password").type("sekret");
      cy.get("#loginButton").click();
      cy.get("#message").contains("Wrong Credentials");
      cy.contains("Login");
    });
  });
  describe.only("When logged in", function () {
    beforeEach(function () {
      // cy.login({ username: "albertomarti", password: "password123" });
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "albertomarti",
        password: "password123",
      }).then((response) => {
        localStorage.setItem("loggedBlogUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });
    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Testing with Cypress");
      cy.get("#author").type("Momo");
      cy.get("#url").type("trialUrl");
      cy.get("#createButton").click();
      // cy.get("#message").contains(
      //   "new blog Testing with Cypress has been added"
      // );
      // cy.contains("Testing with Cypress");
    });
  });
});
