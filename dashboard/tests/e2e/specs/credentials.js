const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () => {
  it('should generate an api_key', () =>{
    cy.visit(APP_URL);

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.wait(2000)
    cy.get('#password-field').type('1234')
    cy.wait(2000)
    cy.get('#submit-button').click()

    cy.wait(2000)
    cy.visit(`${APP_URL}/credentials`)
    cy.wait(2000)

    const oldApiKey = cy.get('#apikey').invoke('text');
    cy.get('#generate-apikey').click();
    cy.wait(2000);
    const newApikey = cy.get('#apikey').invoke('text');

    expect(oldApiKey).to.not.equal(newApikey)
  })
})
