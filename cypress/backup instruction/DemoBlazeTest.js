import DemoBlazePage from "../../models/pages/DemoBlazePage";
import products from "./DemoBlazeProduct.json"

describe('DemoBlaze Page Test', () => {

    it('should be able to get hero card title',  () => {
        cy.visit("https://www.demoblaze.com/");
        new DemoBlazePage().getAllCardData().then(allCardData => {
            cy.wrap('').then(() => {
                expect(allCardData).to.be.deep.eq(products)
            })
        })
        
    });

    it.only('should be able to get api',  () => {
        cy.visit("https://www.demoblaze.com/");
        
        // Intercept default homepage product
        cy.intercept('/entries').as('entries')
        cy.wait('@entries')
        cy.get('@entries').then(entries => {
            let apiProductData = entries.response.body.Items
            //cy.log(JSON.stringify(entries.response.body.Items))
            apiProductData = apiProductData.map(item => {
                return {
                    itemName: item.title.replace('\n', ''),
                    itemPrice: `$${item.price}`
                }
            })
            //cy.log(JSON.stringify(items))
            new DemoBlazePage().getAllCardData().then(allCardData => {
                cy.wrap('').then(() => {
                    expect(allCardData).to.be.deep.eq(apiProductData)
                })
            })
        })
        
    });

});