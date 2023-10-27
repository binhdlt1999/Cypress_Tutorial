export default class FooterComponent{

    getColumns = () => cy.get('#fotcont .caption')
    getColumnHeader = () => cy.get('h4')
    getDesc = () => cy.get('p')
    

    getAboutUsData(){
        let aboutusdata = {};
        this.getColumns().eq(0).within(() => {
            this.getColumnHeader().then($header => aboutusdata.header = $header.text().trim())
            this.getDesc().then($desc => aboutusdata.desc = $desc.text().replace(/\n\s+/g, ' ').trim())
        })
        return new Cypress.Promise(resolve => cy.wrap('').then(() => resolve(aboutusdata)))
    }

    getContactUsData(){
        let contactusdata = {};
        this.getColumns().eq(1).within(() => {
            this.getColumnHeader().then($header => contactusdata.header = $header.text().trim())
            this._getMultiDesc().then($desc => contactusdata.desc = $desc)
        })
        return new Cypress.Promise(resolve => cy.wrap('').then(() => resolve(contactusdata)))
    }

    _getMultiDesc(){
        let desc = "";
        this.getDesc().each($descLine => {
            desc = desc + $descLine.text().trim() + " ";
        })
        return new Cypress.Promise(resolve => cy.wrap('').then(() => resolve(desc)))
    }
}