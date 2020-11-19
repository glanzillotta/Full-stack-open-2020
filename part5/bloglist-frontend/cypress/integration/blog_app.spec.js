describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('html').should('contain', 'username').and('contain', 'password').and('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[name="Username"]').type('root')
      cy.get('[name="Password"]').type('sekret')
      cy.contains('login').click()

      cy.get('html').should('contain', 'root logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="Username"]').type('root')
      cy.get('[name="Password"]').type('fail')
      cy.contains('login').click()

      cy.get('[name="message"]').should('contain', 'Wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'root', password: 'sekret'
      })
        .then(response => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('[name="title"]').type('new title')
      cy.get('[name="author"]').type('new author')
      cy.get('[name="url"]').type('new url')
      cy.get('[name="create"]').click()

      cy.get('[name="message"]').should('contain', 'a new blog new title by new author has been added').and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('when created a blog', function () {
      beforeEach(function () {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs',
          body: {
            author: 'new author',
            title: 'new title',
            url: 'new url'
          },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
      })

      it('A blog can be liked',function () {
        cy.get('#view').click()
        cy.get('.likes').contains('0')
        cy.get('#like').click()
        cy.get('.likes').contains('1')
      })

      it('Delete a blog by its creator', function () {
        cy.get('#view').click()
        cy.get('#remove').click()
        cy.get('[name="message"]').should('contain', 'The blog new title has been removed').and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it.only('error deleting a blog', function () {
        localStorage.clear()
        const newUser = {
          username: 'bunker',
          password: 'punpun'
        }
        cy.request('POST', 'http://localhost:3001/api/users', newUser)
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'bunker', password: 'punpun'
        })
          .then(response => {
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
          })
        cy.get('#view').click()
        cy.get('#remove').click()
        cy.get('[name="message"]').should('contain', '401').and('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })
  })
})