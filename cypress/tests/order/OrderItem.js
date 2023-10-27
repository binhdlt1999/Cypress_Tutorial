/*
[Scenario 01] I order item as guest
* 1. Open the page
* 2. Select a random category
* 3. Select a random product
* 4. Add to cart
* 5. Go to cart and verify cart detail
* 6. Place order as guest

[Scenario 01] I order item as logged in user
* 1. Login to the page
* .. Place order as logged in user

* */

import HeaderComponent from "../../models/components/HeaderComponent";
import LoginComponent from "../../models/components/LoginComponent";
import ProductDetailComponent from "../../models/components/ProductDetailComponent";
import { HomePageAPI } from "../../support/HomePageAPI";

describe('Order Item Test', () => {

    beforeEach(() => {
        cy.visit('/');
    });
    
    it('Order item as guest', () => {
        purchaseItem()
    });

    it('Order item as logged in user', () => {
        
        // Login
        const LOGIN_CRED = {
            username: "binh",
            password: "admin"
        }
        
        const {username, password} = LOGIN_CRED;
        login(username, password)

        //Purchase
        purchaseItem()
    });

})

const login = (username, password) => {
    const headerComp = new HeaderComponent()
    const loginComp = new LoginComponent()
    headerComp.getLoginLink().click()
    loginComp.getLoginModal().should('be.visible')
    loginComp.getUsername().type(username, {force:true, waitForAnimation: true}) // Wait for animation
    loginComp.getPassword().type(password, {force:true, waitForAnimation: true})
    loginComp.getLoginBtn().click()
}

function purchaseItem() {

    HomePageAPI.getHomePageProducts().then(apiProduct => {

        const productDetails = new ProductDetailComponent()
        const headerComp = new HeaderComponent()
        // Select a random product
        const apiData = apiProduct.response.body.Items
        const randomProduct = apiData[Math.floor(Math.random() * apiData.length)]
        const randomProductTitle = randomProduct.title.trim().replace('\n','')
        cy.contains(randomProductTitle).click()
        
        // Click on Add to cart button
        productDetails.getAddToCartBtn().click()

        // Go to cart
        headerComp.getCartLink().click()

        // Verify cart detail

        
        // Place order as guest
        cy.contains('Place Order').click()

        // Place order details
        cy.get('#name').type('Binh', {force:true, waitForAnimation: true})
        cy.get('#country').type('Vietnam')
        cy.get('#city').type('HCM')
        cy.get('#card').type('123456789')
        cy.get('#month').type('10')
        cy.get('#year').type('2000')
        cy.contains('Purchase').click()

        // Verification
        // Verify purchase confirm dialog
        cy.get('.sweet-alert h2').should('contain.text', 'Thank you for your purchase!')
        cy.get('.sweet-alert .lead').then(($confirmOrderDetails) => {
            cy.wrap($confirmOrderDetails).should('contain.text', randomProduct.price)
            cy.wrap($confirmOrderDetails).should('contain.text', 'Card Number: 123456789')
        })
    })

    
}