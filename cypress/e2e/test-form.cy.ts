const mail = "johndooooe@example.com";
const password = "Passwoord123@";

describe("SignUpForm", () => {
  it("Display and test sign up form", () => {
    cy.visit("/signup");
    // Test pour un nom de famille trop court
    cy.get('input[placeholder="Lastname"]').clear().type("D");
    cy.get('input[placeholder="Firstname"]').clear().type("J");
    cy.get('input[placeholder="E-mail address"]').clear().type("John");
    cy.get('input[placeholder="Password"]').clear().type("password");
    cy.get('input[placeholder="Confirm password"]').clear().type("password");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains(
      "Too short lastname between 3 and 30 characters"
    );
    //! cy.screenshot("Error-lastname");

    // Test pour un prénom trop court
    cy.get('input[placeholder="Lastname"]').clear().type("Doe");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains(
      "Too short firstname between 3 and 30 characters"
    );
    //! cy.screenshot("Error-firstname");

    // Test pour une adresse e-mail invalide
    cy.get('input[placeholder="Firstname"]').clear().type("Johnn");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Invalid email address");
    //! cy.screenshot("Error-email");

    // Test pour un mot de passe invalide
    cy.get('input[placeholder="E-mail address"]')
      .clear()
      .type("Johnnyy@mail.fr");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains(
      "Password must contain at least one uppercase letter, one special character, and be at least 12 characters long."
    );
    //! cy.screenshot("Error-password");

    // Test pour des mots de passe qui ne correspondent pas
    cy.get('input[placeholder="Password"]').clear().type("Password@@@");
    cy.get('input[placeholder="Confirm password"]').clear().type("password@@@");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains("Passwords do not match!");
    //! cy.screenshot("Error-password-not-match");

    // Test pour un mot de passe invalide
    cy.get('input[placeholder="Password"]').clear().type("Password@@@");
    cy.get('input[placeholder="Confirm password"]').clear().type("Password@@@");
    cy.get("#sign_up_btn").click();
    cy.get("#error_signup").contains(
      "Password must contain at least one uppercase letter, one special character, and be at least 12 characters long."
    );
    //! cy.screenshot("Error-format-password");

    // Test pour une inscription réussie
    cy.get('input[placeholder="E-mail address"]').clear().type(mail);
    cy.get('input[placeholder="Password"]').clear().type(password);
    cy.get('input[placeholder="Confirm password"]').clear().type(password);
    cy.get("#sign_up_btn").click();
    cy.wait(2000) 
    //! cy.screenshot("Success-signup");
    // cy.visit("/");
    cy.get('h1[id="fast_log"]').click();
    cy.get('button[id="cart_btn"]').click();
    //* Tester si l'user n'existe pas
    // cy.get('input[placeholder="Password"]').type("password");
    // cy.get('#btn_login').click();
    // cy.get("#login_error").contains("User or password unknown");
    // //! cy.screenshot("error-login")
    
    // // Tester si l'user existe
    // cy.get('input[placeholder="E-mail address"]').type("aserbelloni@dev-id.fr", {force: true});
    // cy.get('input[placeholder="Password"]').clear().type(password);
    // cy.get('#btn_login').click();
    // cy.get("#login_error")
    // cy.wait(3000);
    // cy.url().should("include", "/");
    //! cy.screenshot("error-login");
//   });
// });

// describe("navigate on site", () => {
//   it("Show all site pages", () => {
    cy.visit("/");
    // cy.get("#fast_log").click();
    cy.get("a[id=navigate_to_news]").click();
    cy.get("a[id=navigate_to_add_news]").click();
    cy.get("a[id=navigate_to_store]").click();
    cy.scrollTo(0, 20900);
    cy.get("#scroll_btn").click();
    cy.get("a[id=navigate_to_home]").click();
    cy.get("a[id=navigate_to_add_news]").click();
    cy.get('input[placeholder="News title"]').type("A");
    cy.get('textarea[placeholder="News description"]').type("A");
    cy.get('input[placeholder="News image"]').type("A");
    cy.get("#register_new_news").click();
    cy.get('input[placeholder="News title"]')
      .clear()
      .type(
        "Once upon a time, in a land far, far away, there lived a young princess named Aurora. She was the most beautiful and kind-hearted princess in all the land"
      );
    cy.get('textarea[placeholder="News description"]')
      .clear()
      .type(
        "Our company prides itself on delivering high-quality products and exceptional customer service. We have a team of experts who are dedicated to ensuring that"
      );
    cy.get('input[placeholder="News image"]')
      .clear()
      .type("https://fiverr-res.cloudinary.com");
    cy.get("#register_new_news").click();
    cy.get('input[placeholder="News title"]')
      .clear()
      .type("Once upon a time...");
    cy.get('textarea[placeholder="News description"]').clear().type("A test");
    cy.get("#register_new_news").click();
    cy.get('input[placeholder="News image"]')
      .clear()
      .type(
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/278849011/original/367616e37b5b82b79686ea7b0e9d0d92cbd5d893/test-your-website-and-i-have-an-experience-on-the-forex-system.jpg"
      );
    cy.get("#register_new_news").click();
    cy.wait(2000);
    cy.get("[data-news-like-id]")
      .should("exist")
      .invoke("attr", "data-news-like-id")
      .then((newsId) => {
        cy.get(`[data-testid="like-news-${newsId}"]`).click();
      });
    cy.wait(3000);
    cy.get("[data-news-like-id]")
      .should("exist")
      .invoke("attr", "data-news-like-id")
      .then((newsId) => {
        cy.get(`[data-testid="like-news-${newsId}"]`).click();
      });
    cy.get("[data-news-update-id]")
      .should("exist")
      .invoke("attr", "data-news-update-id")
      .then((newsId) => {
        cy.get(`[data-testid="update-news-${newsId}"]`).click();
      });
    cy.get('input[placeholder="Enter the updated title"]').type("Update news", {
      force: true,
    });
    cy.get('textarea[name="content"]').type("Update news", { force: true });
    cy.get("#validate_update").click({ force: true });
    cy.wait(3000);
    cy.get("[data-news-id]")
      .should("exist")
      .invoke("attr", "data-news-id")
      .then((newsId) => {
        cy.get(`[data-testid="delete-news-${newsId}"]`).click();
      });
    cy.get('button[id="validate_deletion"]').click();
    cy.wait(1500);
    cy.visit("/");
  });
});
