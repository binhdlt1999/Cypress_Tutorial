import ProductDetailComponent from "../../models/components/ProductDetailComponent";
import { HomePageAPI } from "../../support/HomePageAPI";

describe('Product Detail Test', () => {

    let apiProduct
    beforeEach(() => {
        cy.visit('/');
        HomePageAPI.getHomePageProducts().then(entries => apiProduct = entries.response.body.Items)
    });
    
    it('It should be able to verify product details', () => {
        const randomProduct = apiProduct[Math.floor(Math.random() * apiProduct.length)]
        cy.log(JSON.stringify(randomProduct))

        const randomProductTitle = randomProduct.title.trim().replace('\n','')
        const randomProductDesc = randomProduct.desc.trim().replace('\n', '')
        cy.contains(randomProductTitle).click()
        const productDetails = new ProductDetailComponent()
        productDetails.getProductImg().should('be.visible')
        productDetails.getProductName().should('have.text', randomProductTitle)
        productDetails.getProductPrice().should('contain.text', randomProduct.price)
        productDetails.getAddToCartBtn().should('be.visible')
        productDetails.getProductDesc().should('not.be.empty')
        
    });

})