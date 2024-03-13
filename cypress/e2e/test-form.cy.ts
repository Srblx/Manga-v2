const mail = "johndooooe@example.com";
const password = "Passwoord123@";

describe("SignUpForm", () => {
  it("affiche le formulaire d'inscription", () => {
    cy.visit("http://localhost:5174/signup");
    // Test pour un nom de famille trop court
    cy.get('input[placeholder="Lastname"]').clear().type("D");
    cy.get('input[placeholder="Firstname"]').clear().type("J");
    cy.get('input[placeholder="E-mail address"]').clear().type("John");
    cy.get('input[placeholder="Password"]').clear().type("password");
    cy.get('input[placeholder="Confirm password"]').clear().type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Too short lastname");
    cy.screenshot("Error-lastname");

    // Test pour un prénom trop court
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("J");
    cy.get('input[placeholder="E-mail address"]').clear().type("John");
    cy.get('input[placeholder="Password"]').clear().type("password");
    cy.get('input[placeholder="Confirm password"]').clear().type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Too short firstname");
    cy.screenshot("Error-firstname");

    // Test pour une adresse e-mail invalide
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("Johnn");
    cy.get('input[placeholder="E-mail address"]').clear().type("John");
    cy.get('input[placeholder="Password"]').clear().type("password");
    cy.get('input[placeholder="Confirm password"]').clear().type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Invalid email address");
    cy.screenshot("Error-email");

    // Test pour un mot de passe invalide
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("Johnn");
    cy.get('input[placeholder="E-mail address"]').clear().type("Johnnyy@mail.fr");
    cy.get('input[placeholder="Password"]').clear().type("password");
    cy.get('input[placeholder="Confirm password"]').clear().type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Password must contain at least one uppercase letter, one special character, and be at least 12 characters long.");
    cy.screenshot("Error-password");

    // Test pour des mots de passe qui ne correspondent pas
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("John");
    cy.get('input[placeholder="E-mail address"]').clear().type("Johnnyyy@mail.fr");
    cy.get('input[placeholder="Password"]').clear().type("Password@@@");
    cy.get('input[placeholder="Confirm password"]').clear().type("password@@@");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Passwords do not match!");
    cy.screenshot("Error-password");

    // Test pour un mot de passe invalide
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("Johnn");
    cy.get('input[placeholder="E-mail address"]').clear().type("Joohnnyy@mail.fr");
    cy.get('input[placeholder="Password"]').clear().type("Password@@@");
    cy.get('input[placeholder="Confirm password"]').clear().type("Password@@@");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Password must contain at least one uppercase letter, one special character, and be at least 12 characters long.");
    cy.screenshot("Error-password");

    // Test pour une inscription réussie
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get('input[placeholder="Firstname"]').clear().type("John");
    cy.get('input[placeholder="E-mail address"]').clear().type(mail);
    cy.get('input[placeholder="Password"]').clear().type(password);
    cy.get('input[placeholder="Confirm password"]').clear().type(password);
    cy.get("#sign_up_btn").click();
    cy.url().should("include", "/");
    cy.screenshot("Success-signup");
  
    cy.get('input[placeholder="E-mail address"]').type("mail@mail.fr");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get("#button-login").click();
    cy.get('#login_error').contains("User or password unknown")
    cy.screenshot("error-login")

    cy.get('input[placeholder="E-mail address"]').clear().type(mail);
    cy.get('input[placeholder="Password"]').clear().type(password);
    cy.get("#button-login").click();
    cy.screenshot("error-login")

  });
})
//   });
//   it("displays the sign up form", () => {
//   });
//   it("login failed home page", () => {
//   it("login success home page", () => {
//     cy.visit("http://localhost:5173/");
//     cy.get('input[placeholder="E-mail address"]').type(mail);
//     cy.get('input[placeholder="Password"]').type(password);
//     cy.get("#button-login").click();
//     cy.get("#add_manga_in_cart").click();
//     cy.scrollTo(0, 20900)
//     cy.get('#scroll_btn').click();
//     cy.get('#cart_btn').click();
//     // cy.get('#close_cart_btn').click({force: true});
//   });
// });
