describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'root',
      password:'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('html').should('contain', 'username').and('contain', 'password').and('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('root')
      cy.get('[name="Password"]').type('sekret')
      cy.contains('login').click()

      cy.get('html').should('contain','root logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('root')
      cy.get('[name="Password"]').type('fail')
      cy.contains('login').click()

      cy.get('[name="message"]').should('contain','Wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})