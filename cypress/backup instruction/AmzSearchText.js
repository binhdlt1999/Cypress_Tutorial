import AmazonHomePage from "../../models/pages/AmazonHomePage";
import AmazonSearchResultPage from "../../models/pages/AmazonSearchResultPage";

describe('Amazon Search', () => {

    it('should be able to search thing',  () => {
        cy.visit("https://www.amazon.com/");

        const SEARCH_TEXT = "iphone 15 promax";
        let amzHomePage = new AmazonHomePage();
        amzHomePage.searchTxtBxElem.type(SEARCH_TEXT);
        amzHomePage.searchBtnElem.click();

        let amzSearchResultPage = new AmazonSearchResultPage;
        amzSearchResultPage.searchResultItemElem.should("not.have.length","0");
 
             
    });

});