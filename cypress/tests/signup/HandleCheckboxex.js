const CHECKBOXES_SEL = "[type='checkbox']";

describe('Handling checkboxes', () => {

    it('should be able to select/unselect checkbox', {defaultCommandTimeout:5000},  () => {
        cy.visit("https://the-internet.herokuapp.com/checkboxes")

        // Try to unselect the second checkbox
        cy.get(CHECKBOXES_SEL).eq(1).click()

        // Verify all checkboxes are unslected
        cy.get(CHECKBOXES_SEL).filter(":not([checked])").should("have.length", 2)

        // Loop over all checkboxes again then select all
        cy.get(CHECKBOXES_SEL).filter(":not([checked])").each((item) => {
            cy.get(item).click()
        })

        cy.get(CHECKBOXES_SEL).filter("[checked]").then(item => {
            cy.get(item).click({ multiple: true })
        })
        
        
    });

});
