import HeaderComponent from "../../models/components/HeaderComponent";
import LoginComponent from "../../models/components/LoginComponent";

const LOGIN_CRED = {
    username: "tun",
    password: "admin"
}

describe('Login Test', () => {

    let headerComp;
    let loginComp;
    beforeEach(() => {
        cy.visit('/');
        headerComp = new HeaderComponent()
        loginComp = new LoginComponent()
    });

    const login = (username, password) => {
        headerComp.getLoginLink().click()
        loginComp.getLoginModal().should('be.visible')
        loginComp.getUsername().type(username, {force:true, waitForAnimation: true}) // Wait for animation
        loginComp.getPassword().type(password, {force:true, waitForAnimation: true})
        loginComp.getLoginBtn().click()
    }

    it('should be able to login with correct cred', () => {
        const {username, password} = LOGIN_CRED;
        login(username, password)
        headerComp.getLoggedUsername().should('be.visible')
        headerComp.getLoggedUsername().should('contain.text', `Welcome ${LOGIN_CRED.username}`)
    });

    it('should be able to see blank username and password', () => {
        headerComp.getLoginLink().click()
        loginComp.getLoginBtn().click()
        cy.on('window:alert', (message) => {
            expect(message).to.contains('Please fill out Username and Password');
        })
    });

    it('should be able to see wrong username', () => {
        const {username, password} = LOGIN_CRED;
        login(username + "_WRONG", password)
        cy.on('window:alert', (message) => {
            expect(message).to.contains('User does not exist');
        })
    });

    it('should be able to see wrong password', () => {
        const {username, password} = LOGIN_CRED;
        login(username, password + "_WRONG")
        cy.on('window:alert', (message) => {
            expect(message).to.contains('Wrong password');
        })
    });

    afterEach(() => {
        // Xóa hết các kết quả (catch) sau mỗi bài kiểm tra
        cy.clearLocalStorage();
        cy.clearCookies();
    });

})