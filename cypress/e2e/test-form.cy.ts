const mail = "johndoe@example.com";
const password = "Password123@";

describe("SignUpForm", () => {
  it("displays the sign up form", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get('input[placeholder="Lastname"]').type("Doe");
    cy.get('input[placeholder="Firstname"]').type("John");
    cy.get('input[placeholder="E-mail address"]').type("mail@mail.fr");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('input[placeholder="Confirm password"]').type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains(
      "Password must contain at least one uppercase letter, one special character, and be at least 12 characters long."
    );
    cy.screenshot("Error-password");
    // cy.url().should("include", "/dashboard"); 
  });
  it("displays the sign up form", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get('input[placeholder="Lastname"]').type("Doe");
    cy.get('input[placeholder="Firstname"]').type("John");
    cy.get('input[placeholder="E-mail address"]').type(mail);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Confirm password"]').type(password);
    cy.get("#sign_up_btn").click();
    cy.url().should("include", "/"); 
  });
  it("login failed home page", () => {
    cy.visit("http://localhost:5173/");
    cy.get('input[placeholder="E-mail address"]').type("mail@mail.fr");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get("#button-login").click();
    cy.screenshot("error-login")
  });
  it("login success home page", () => {
    cy.visit("http://localhost:5173/");
    cy.get('input[placeholder="E-mail address"]').type(mail);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get("#button-login").click();
    cy.get("#add_manga_in_cart").click();
    cy.scrollTo(0, 20900)
    cy.get('#scroll_btn').click();
    cy.get('#cart_btn').click();
    // cy.get('#close_cart_btn').click({force: true});
  });
});
