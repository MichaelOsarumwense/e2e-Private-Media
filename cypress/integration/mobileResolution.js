/// <reference types="cypress" />

//Defining the mobile view ports to run test
const sizes = ['samsung-s10'];

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
			cy.editPost();
			cy.deletePost();
			cy.editProfile();
		});

		it(`Verify mobile users can delete account ${size}`, () => {
			cy.deleteAccount();
		});
	});
});
