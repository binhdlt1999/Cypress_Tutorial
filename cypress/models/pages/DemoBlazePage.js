export default class DemoBlazePage {

    _getCardDetail(){
        let cardData = {}
        cy.get('h4').then($title => cardData.itemName = $title.text().trim())
        cy.get('h5').then($price => cardData.itemPrice = $price.text().trim())
        return new Cypress.Promise(resolve => resolve(cardData))
    }

    getAllCardData(){
        let allCardData = [];
        cy.get('.card').each($card => {
            cy.wrap($card).within(() => {
                // let itemName, itemPrice;
                // cy.get('h4').then($title => itemName.text().trim())
                // cy.get('h5').then($price => itemPrice.text().trim())
                // allCardData.push({itemName, itemPrice})
                this._getCardDetail().then(cardData => allCardData.push(cardData))
            })
        })
        return new Cypress.Promise(resolve => cy.wrap('').then(() => resolve(allCardData))
        )


    }
}