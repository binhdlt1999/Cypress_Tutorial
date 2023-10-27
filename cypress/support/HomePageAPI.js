export class HomePageAPI {

    static getHomePageProducts() {
        this._waitForEntriesRequest();
        return cy.get('@entries')
    }

    static waitForHomePageLoaded() {
        this._waitForEntriesRequest();
    }

    static _waitForEntriesRequest() {
        cy.intercept('/entries').as('entries')
        cy.wait('@entries')
    }

}