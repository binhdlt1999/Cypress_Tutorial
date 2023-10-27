export default class SignUpComponent{

    getSignUpModal = () => cy.get('#signInModal form')
    getUsername = () => cy.get('#sign-username')
    getPassword = () => cy.get('#sign-password')
    getSignUpBtn = () => cy.get('[onclick="register()"]')

}