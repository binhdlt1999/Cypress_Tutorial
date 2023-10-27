describe('Element interaction', () => {

    it('should be able to complete the form', () => {
        // Open login page
        cy.visit("/login")

        // find username by ID then input text
        cy.get("#username").type("tomsmith")

        // find password by adtribute then input text
        cy.get("[name='password']").type("SuperSecretPassword!")

        // find login button by attribute and tag name then click
        cy.get("button[type='submit']").click()

        // DEBUG purpose only
        cy.wait(3000)

    });

});