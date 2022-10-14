const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Home', () => {
  it('should render create account modal when clikc on cta(call to action) creatte account button', () => {
    cy.visit(APP_URL);

    cy.get('#cta-create-account-button').click()
    cy.get('#modal-create-account')
  });

  it('should render create account modal when clikc on header creatte account button', () => {
    cy.visit(APP_URL);

    cy.get('#header-create-account-button').click()
    cy.get('#modal-create-account')
  });

  it('should render login modal when click on header login button', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click()
    cy.get('#modal-login')
  });

  it('should login with email and password', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
  });

  it('should show an error with an invalid e-mail', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.get('#email-error')
  });

  it('should logout work correctly', () => {
    cy.visit(APP_URL);

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')
    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks');
    cy.get('#logout-button').click();

    cy.url().should('include', '/')
  });
})
