describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'friday',
      username: 'friday',
      password: 'friday'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Blog app, 2024')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('friday')
    cy.get('#password').type('friday')
    cy.get('#login').click()
    cy.contains('friday logged in')
  })

  it.only('login expected to fail with wrong pw', function(){
    cy.get('#username').type('friday')
    cy.get('#password').type('monday')
    cy.get('#login').click()
    //cy.get('.error').contains('wrong credentials')
    cy.get('.error')
    .should('contain', 'wrong credentials')
    .and('have.css', 'border-style', 'solid')
    .and('have.css', 'color', 'rgb(255, 0, 0)' )

    //cy.get('html').should('not.contain', 'friday logged in')
    cy.contains('friday').should('not.exist')

  })

})

describe('after logged in', function() {

  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.get('#username').type('friday')
    cy.get('#password').type('friday')
    cy.get('#login').click()
    cy.contains('friday logged in')
  })

  it('a new blog can be created', function() {
    cy.contains('Create New Blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#createBtn').click()
    cy.contains('Title: a blog created by cypress / By: Cypress')
  })

  it('blog can be liked', function () {
    cy.contains('Create New Blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('Cypress')
    cy.get('#url').type('cypress.com')
    cy.get('#createBtn').click()
    cy.contains('Title: a blog created by cypress / By: Cypress')
    cy.get('#viewBtn').click();
    cy.contains('likes 0');
    cy.get('#likes').click();
    cy.contains('likes 1');
  });


})

