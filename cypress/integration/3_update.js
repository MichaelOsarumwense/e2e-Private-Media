/// <reference types="cypress" />

//Defining the mobile view ports to run test
const sizes = [[1024, 768]];

sizes.forEach((size) => {
	describe(`Private-Media e2eTest`, () => {
		before(() => {
			cy.visit(`${Cypress.env('host')}`);
			if (Cypress._.isArray(size)) {
				cy.viewport(size[0], size[1]);
			} else {
				cy.viewport(size);
			}
			cy.createAccount();
			cy.login();
		});

		after(() => {
			cy.deleteAccount();
		});

		context('Update-Post', () => {
			it(`1 Verify user can update post ${size}`, () => {
				cy.createPost();
				cy.get('#editButton').click();
				cy.get('#backButton').click(); // test the back button works
				cy.get('#editButton').click();
				cy.get('#post_content').clear();
				cy.get('#post_content').type(`${Cypress.env('postUpdateText')}`);
				cy.get('#saveButton').click();
				cy.get('.toast').should('contain', 'Updated!');
				cy.url().should('contain', `profile/${Cypress.env('username')}`);
				cy.deletePost();
			});

			context('Update-Profile', () => {
				it(`2 Verify user can update Profile Info ${size}`, () => {
					cy.login(`${Cypress.env('updatedPassword')}`);
					cy.get('#userProfile').click();
					cy.get('#address').clear();
					cy.get('#address').type(`${Cypress.env('addressUpdateText')}`);
					cy.get('#submitButton').click();
					cy.get('.toast').should('contain', 'Updated!');
					cy.url().should('contain', `profile/${Cypress.env('username')}`);
				});
			});

			it(`3 Verify user can Reset Password ${size}`, () => {
				cy.get('#mLogout').click({ force: true });
				cy.get('#resetPassword').click();
				cy.get('#username').type(`${Cypress.env('username')}`);
				cy.get('#password').type(`${Cypress.env('updatedPassword')}`);
				cy.get('#submitButton').click(); // verifying user is unable to change password without secret
				cy.url().should('contain', `forgot-password`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#submitButton').click();
				cy.get('.toast').should('contain', 'Password Changed');
				cy.url().should('contain', `login`);

				//verify new password
				cy.login(`${Cypress.env('updatedPassword')}`);
			});
		});
	});
});
