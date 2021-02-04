/* eslint-disable prettier/prettier */
function sorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] < array[i]) return false;
  }
  return true;
}
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
      cy.login({ username: "albertomarti", password: "password123" });
    });
    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Testing with Cypress");
      cy.get("#author").type("Momo");
      cy.get("#url").type("trialUrl");
      cy.get("#createButton").click();
      cy.get("#message").contains(
        "new blog Testing with Cypress has been added"
      );
      cy.contains("Testing with Cypress");
    });
    describe("A blog already exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Testing with Cypress2",
          author: "Cookie",
          url: "trailUrl",
        });
      });
      it("like can be increased", function () {
        cy.get("#showHide").click();
        cy.contains("likes 0");
        cy.get("#buttonLikes").click();
        cy.contains("likes 1");
      });
      it("blog can be deleted", function () {
        cy.get("#showHide").click();
        cy.contains("remove").click();
        //
        cy.contains("Testing with Cypress2").should("not.exist");
      });
      it("can't delete blog if not the creator", function () {
        cy.contains("Logout").click();
        cy.contains("Login");
        const user = {
          name: " Miriam Grossi",
          username: "miriamgrossi",
          password: "sekret",
        };
        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.visit("http://localhost:3000");
        cy.login({ username: "miriamgrossi", password: "sekret" });
        cy.get("#showHide").click();
        cy.contains("remove").should("not.exist");
      });
      it("blogs are ordered", function () {
        cy.createBlog({
          title: "Testing with Cypress1",
          author: "Cookie",
          url: "trailUrl",
        });
        cy.createBlog({
          title: "Testing with Cypress2",
          author: "Cookie",
          url: "trailUrl",
          likes: 4,
        });
        cy.createBlog({
          title: "Testing with Cypress3",
          author: "Cookie",
          url: "trailUrl",
          likes: 5,
        });
        cy.createBlog({
          title: "Testing with Cypress4",
          author: "Cookie",
          url: "trailUrl",
          likes: 3,
        });
        cy.get(".likeNumber").then((x) => {
          console.log(x);
          let arr = [];
          for (let i = 0; i < x.length; i++) {
            console.log(x[i].innerText);
            arr.push(parseInt(x[i].innerText));
          }
          cy.expect(sorted(arr)).to.be.true;
        });
      });
    });
  });
});
