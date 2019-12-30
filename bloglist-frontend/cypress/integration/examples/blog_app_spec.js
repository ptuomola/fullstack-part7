describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blog app')
  })

  it('non-existing user cannot log in', function() {
    cy.get('#username').type('nonuser')
    cy.get('#password').type('secret')
    cy.contains('login').click()
    cy.contains('wrong username or password')
  })

  it('existing user can log in', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
  })
})