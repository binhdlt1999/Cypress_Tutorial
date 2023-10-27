import DemoBlazePage from "../../models/pages/DemoBlazePage";
import { HomePageAPI } from "../../support/HomePageAPI";

describe('DemoBlaze Home Page Test', () => {

    let apiProduct
    beforeEach(() => {
        cy.login('tun', 'admin')
        cy.visit("https://www.demoblaze.com/");
        HomePageAPI.getHomePageProducts().then(entries => apiProduct = entries)
    })

    it.only('should be able to login by using api',  () => {
        let apiProductData = apiProduct.response.body.Items.map(item => {
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
        
    });

});