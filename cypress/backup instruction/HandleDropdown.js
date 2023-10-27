const DROPDOWN_SEL = "select[id='dropdown']";

describe('Handling dropdown', () => {

    it('should be able to select dropdown option', {defaultCommandTimeout:5000},  () => {
        cy.visit("/dropdown")

        // Select by index | Select option 1
        cy.get(DROPDOWN_SEL).select(1)

        // Select by value | Select option 2
        cy.get(DROPDOWN_SEL).select("2")

        // Select by visible text | Select option 1
        cy.get(DROPDOWN_SEL).select("Option 1")

        // Verify the selected option is option 1
        cy.get("select option:selected").invoke('attr', 'value').should('eq', '1');

        cy.get("select option:selected").invoke('text').should('eq', 'Option 1');   
             
    });

});
