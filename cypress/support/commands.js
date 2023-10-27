// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * @memberof cy
 * @method login
 * */
Cypress.Commands.add('login', (username, password) => {
    cy.request({
        url: 'https://api.demoblaze.com/login',
        method: 'POST',
        headers: {
            contentType: "application/json",
        },
        body: {
            username: username, password: btoa(password)
        }  
    }).then(res => {
        // cy.log(JSON.stringify(res.body.split('Auth_token: ')[1]))
        const authToken = res.body.split('Auth_token: ')[1];
        cy.log(authToken);
        cy.setCookie('tokenp_', authToken)
    })
})