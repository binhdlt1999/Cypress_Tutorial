import { SRHomePage } from "../../models/pages/SRHomePage";

describe('SR HomePage Test', () => {

    it('should be able to print all the titles',  () => {
        cy.visit("https://www.simplyrecipes.com/");
        cy.get('.card__title').each(($title, index) => {
            cy.log(index);
            cy.log($title.text().trim())
        })
    });

    it('should be able to interact with a component',  () => {
        cy.visit("https://www.simplyrecipes.com/");
        const srHomePage = new SRHomePage();
        srHomePage.heroComponent().cardTitle.each(($title, index) => {
            cy.log(index);
            cy.log($title.text().trim())
        })

    });

    it.only('should be able to get hero card title',  () => {
        cy.visit("https://www.simplyrecipes.com/");
        new SRHomePage().getHeroCompTitle().then(title => {
            cy.wrap('').then(() => {
                expect(title).to.be.eq('I Make Marcella Hazan’s Soup When I Only Have 15 Minutes and Need Spoonfuls of Comfort')
            })
        })
        
    });

});