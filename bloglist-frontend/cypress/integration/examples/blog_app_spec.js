describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Petri Tuomola',
      username: 'ptuomola',
      password: 'silent'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

  it('logged in user can create a blog', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
    cy.contains('create new').click()
    cy.get('#title').type('This is a test title for a blog')
    cy.get('#author').type('Test author')
    cy.get('#url').type('http://www.test.com')
    cy.get('#createBlog').click()
    cy.contains('This is a test title for a blog Test author')
  })
})