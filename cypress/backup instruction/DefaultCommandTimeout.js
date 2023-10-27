describe('Exploring default command time out', () => {

    it('should be able to apply custom default timeout', {defaultCommandTimeout:5000},  () => {
        cy.visit("/")

        // Use timeout
        // cy.get("#username__", {timeout:10000}).type("tomsmith")
        // cy.get("#username_").type("tomsmith")
        
        cy.get("a[href='/login']").click()
        cy.location('pathname', {timeout:6000}).should("eq", "/login")


    });

});
