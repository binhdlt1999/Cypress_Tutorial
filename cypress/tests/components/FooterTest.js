import FooterComponent from "../../models/components/FooterComponent";

describe('Footer Component Test', () => {

    const BRAND_TEXT = 'PRODUCT STORE';
    let footerComp;

    beforeEach(() => {
        cy.visit('/');
        footerComp = new FooterComponent()
    });
    
    it('Test for About Us', () => {
        const expectedAboutUsData = {
            "header":"About Us",
            "desc":"We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality."
        }
        footerComp.getAboutUsData().then(actualAboutUsData => {
            cy.wrap('').then(() => {
                expect(actualAboutUsData).to.eql(expectedAboutUsData)
            })
        })
    });

    it.only('Test for Contact Us', () => {
        const expectedContactUs = {
            header:"Get in Touch",
            address: "2390 El Camino Real",
            phone: "+440 123456",
            email: "demo@blazemeter.com"
        }

        footerComp.getContactUsData().then(actualContactUs => {
            cy.wrap('').then(() => {
                // expect(actualContactUs).to.eql(expectedContactUs)
                expect(actualContactUs.header).to.equal(expectedContactUs.header)
                expect(actualContactUs.desc).to.contains(expectedContactUs.address)
                expect(actualContactUs.desc).to.contains(expectedContactUs.phone)
                expect(actualContactUs.desc).to.contains(expectedContactUs.email)                
            })
        })
    });

})