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

  it('existing user can logout', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
    cy.contains('logout').click()
    cy.contains('logged out')
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

  it('logged in user can create a blog and like it', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
    cy.contains('create new').click()
    cy.get('#title').type('This is a blog I am going to like')
    cy.get('#author').type('Test author')
    cy.get('#url').type('http://www.test.com')
    cy.get('#createBlog').click()
    cy.contains('This is a blog I am going to like Test author').click()
    cy.contains('Likes')
    cy.contains('0')
    cy.get('#likeButton').click()
    cy.contains('1')
  })

  it('logged in user can create a blog and remove it', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
    cy.contains('create new').click()
    cy.get('#title').type('This is a blog I am going to remove')
    cy.get('#author').type('Test author')
    cy.get('#url').type('http://www.test.com')
    cy.get('#createBlog').click()
    cy.contains('This is a blog I am going to remove Test author').click()
    cy.contains('remove').click()
    cy.contains('This is a blog I am going to remove Test author').should('not.exist')
  })

  it('logged in user can create a blog and add a comment', function() {
    cy.get('#username').type('ptuomola')
    cy.get('#password').type('silent')
    cy.contains('login').click()
    cy.contains('Petri Tuomola logged in')
    cy.contains('create new').click()
    cy.get('#title').type('This is a blog I am going to comment')
    cy.get('#author').type('Test author')
    cy.get('#url').type('http://www.test.com')
    cy.get('#createBlog').click()
    cy.contains('This is a blog I am going to comment Test author').click()
    cy.get('#newComment').type('This is a test comment')
    cy.contains('add comment').click()
    cy.contains('This is a test comment')
  })

})