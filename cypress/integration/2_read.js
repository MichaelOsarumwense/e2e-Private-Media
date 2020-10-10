/// <reference types="cypress" />

//Defining the mobile view ports to run test
const sizes = [[1024, 768]];

sizes.forEach((size) => {
	describe(`Private-Media`, () => {
		beforeEach(() => {
			cy.visit(`${Cypress.env('host')}`);
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}
			cy.createAccount();
			cy.login();
		});

		afterEach(() => {
			cy.deleteAccount();
		});

		context('Read-Profile Details', () => {
			it(`Verify user profile details ${size}`, () => {
				cy.get('#profileName').should('contain', `${Cypress.env('username')}`);
				cy.get('#profileAddress').should('contain', `${Cypress.env('address')}`);
				cy.get('#profileDob').should('contain', `${Cypress.env('dob')}`);
				cy.get('#profileHobbies').should('contain', `${Cypress.env('hobbies')}`);
				cy.get('#profileEvents').should('contain', `${Cypress.env('events')}`);
			});
		});

		context('Read-Post Details', () => {
			it(`Verify user post content ${size}`, () => {
				cy.createPost();
				cy.get('#newPost').should('contain', `${Cypress.env('postText')}`);
				cy.deletePost();
			});
		});
	});
});
