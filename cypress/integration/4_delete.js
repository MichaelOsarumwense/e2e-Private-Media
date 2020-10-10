/// <reference types="cypress" />

//Defining the mobile view ports to run test
const sizes = [[1024, 768]];

sizes.forEach((size) => {
	describe(`Private-Media`, () => {
		before(() => {
			cy.visit(`${Cypress.env('host')}`);
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}
			cy.createAccount();
			cy.login();
			cy.createPost();
		});

		context('Delete-Post', () => {
			it(`Verify user can delete post ${size}`, () => {
				cy.deletePost();
			});
		});

		context('Delete-Account', () => {
			it(`Verify user post content ${size}`, () => {
				cy.deleteAccount();
			});
		});
	});
});
