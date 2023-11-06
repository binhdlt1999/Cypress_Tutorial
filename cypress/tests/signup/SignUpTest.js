import HeaderComponent from "../../models/components/HeaderComponent";
import SignUpComponent from "../../models/components/SignUpComponent";

const generateRandomUser = usernameLength => {
    const ALL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const ALL_CHARS_LENGTH = ALL_CHARS.length;
    let randomUsername = '';
    for (let i = 0; i < usernameLength; i++) {
        randomUsername += ALL_CHARS.charAt(Math.floor(Math.random() * ALL_CHARS_LENGTH))
    }
    return randomUsername
}

const SIGN_UP_CRED = {
    username: generateRandomUser(6),
    password: "admin"
}

describe('Signup Test', () => {

    let headerComp;
    let signupComp;
    beforeEach(() => {
        cy.visit('/');
        headerComp = new HeaderComponent()
        signupComp = new SignUpComponent()
    });

    const signup = (username, password) => {
        headerComp.getSignUpLink().click({force:true, waitForAnimation: true})
        signupComp.getSignUpModal().should('be.visible')
        signupComp.getUsername().type(username, {force:true, waitForAnimation: true}) // Wait for animation
        signupComp.getPassword().type(password, {force:true, waitForAnimation: true})
        signupComp.getSignUpBtn().click()
    }

    it('should be able to sign up with correct cred', () => {
        const {username, password} = SIGN_UP_CRED;
        signup(username, password)
        cy.on('window:alert', (message) => {
            expect(message).to.contains('Sign up successful')
        })
    });

    it('should be able to see existing username', () => {
        const {password} = SIGN_UP_CRED;
        signup('binh', password)
        cy.on('window:alert', (message) => {
            expect(message).to.contains('This user already exist')
        })
    });

    // afterEach(() => {
    //     // Xóa hết các kết quả (catch) sau mỗi bài kiểm tra
    //     cy.clearLocalStorage();
    //     cy.clearCookies();
    // });

})