describe('user-boarding', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')
    })

    it('can submit', () => {
        cy.get('input[name="name"]')
        .type('Shantel')
        .should('have.value', 'Shantel')
        

        cy.get('input[name="email"]')
        .type('not-today@gmail.com')
        .should('have.value', 'not-today@gmail.com')

        cy.get('input[name="password"]')
        .type('Shantel')
        .should('have.value', 'Shantel')


        cy.get('input[name="terms"]')
        .check()
        .should('have.checked')

        cy.get('button[name="submit"]')
        .click()
    })

    it('has validation error if username < 0 characters', () => {
        cy.get('input')
        .should((data) => {
            expect(data).to.have.length
        
            
          })
      })
})