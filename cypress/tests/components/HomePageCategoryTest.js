import DemoBlazePage from "../../models/pages/DemoBlazePage";
import { HomePageAPI } from "../../support/HomePageAPI";

describe('Home Page Category Test', () => {

    beforeEach(() => {
        cy.visit('/');
        HomePageAPI.waitForHomePageLoaded();
    });

    function verifyCategoryFilterBy(productName) {
        cy.intercept('/bycat').as('cats')
        cy.get(`[onclick="byCat(\'${productName}\')"]`).click({force: true}) // make sure click the item
        cy.wait('@cats')
        cy.request({
            method: "POST",
            url: "https://api.demoblaze.com/bycat",
            body: {
                cat: `${productName}`
            }
        }).then(res => {
            let apiProductData = res.body.Items.map(item => {
                return {
                    itemName: item.title.replace('\n', ''),
                    itemPrice: `$${item.price}`,
                }
            })
            new DemoBlazePage().getAllCardData().then(allCardData => {
                cy.wrap('').then(() => {
                    expect(allCardData).to.be.eql(apiProductData)
                })
            })
        })
    }

    const SCENARIOS = ["phone", "notebook", "monitor"]
    SCENARIOS.forEach(product => {
        it(`should be able to filter ${product} products`, () => {
            verifyCategoryFilterBy(`${product}`)
        });
    })

    it('should be able to filter products by pagination next', () => {
        cy.intercept('/pagination').as('paginations')
        cy.get('button[id="next2"]').click({force: true}) // make sure click the item
        cy.wait('@paginations')
        cy.request({
            method: "POST",
            url: "https://api.demoblaze.com/pagination",
            body: {
                id: "9"
            }
        }).then(res => {
            let apiProductData = res.body.Items.map(item => {
                return {
                    itemName: item.title.replace('\n', ''),
                    itemPrice: `$${item.price}`,
                }
            })
            new DemoBlazePage().getAllCardData().then(allCardData => {
                cy.wrap('').then(() => {
                    expect(allCardData).to.be.eql(apiProductData)
                })
            })
        })
    });

    it('should be able to filter products by pagination prev', () => {
        cy.intercept('/pagination').as('paginations')
        cy.get('button[id="prev2"]').click({force: true}) // make sure click the item
        cy.wait('@paginations')
        cy.request({
            method: "POST",
            url: "https://api.demoblaze.com/pagination",
            body: {
                id: "1"
            }
        }).then(res => {
            let apiProductData = res.body.Items.map(item => {
                return {
                    itemName: item.title.replace('\n', ''),
                    itemPrice: `$${item.price}`,
                }
            })
            new DemoBlazePage().getAllCardData().then(allCardData => {
                cy.wrap('').then(() => {
                    expect(allCardData).to.be.eql(apiProductData)
                })
            })
        })
    });

    // it('should be able to filter phone products', () => {
    //     verifyCategoryFilterBy('phone')
    // });

    // it('should be able to filter notebook products', () => {
    //     verifyCategoryFilterBy('notebook')
    // });

    // it('should be able to filter monitor products', () => {
    //     verifyCategoryFilterBy('monitor')
    // });

})