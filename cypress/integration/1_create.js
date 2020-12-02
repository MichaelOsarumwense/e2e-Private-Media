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
		});
		after(() => {
			cy.deletePost();
			cy.deleteAccount();
		});

		context('Create-Profile', () => {
			it(`Verify an account is not created without user entering secrete word ${size}`, () => {
				cy.get('#register').click();
				cy.get('#password').type(`${Cypress.env('password')}`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#address').type(`${Cypress.env('address')}`);
				cy.get('#dob').type(`${Cypress.env('dob')}`);
				cy.get('#events').type(`${Cypress.env('events')}`);
				cy.get('#hobbies').type(`${Cypress.env('hobbies')}`);
				cy.get('#submitButton').click();
				cy.url().should('contains', 'register');
			});

			it(`Verify an account is not created without user entering username ${size}`, () => {
				cy.get('#register').click();
				cy.get('#password').type(`${Cypress.env('password')}`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#address').type(`${Cypress.env('address')}`);
				cy.get('#dob').type(`${Cypress.env('dob')}`);
				cy.get('#events').type(`${Cypress.env('events')}`);
				cy.get('#hobbies').type(`${Cypress.env('hobbies')}`);
				cy.get('#submitButton').click();
				cy.url().should('contains', 'register');
			});

			it(`Verify an account is not created without user entering password ${size}`, () => {
				cy.get('#register').click();
				cy.get('#username').type(`${Cypress.env('username')}`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#address').type(`${Cypress.env('address')}`);
				cy.get('#dob').type(`${Cypress.env('dob')}`);
				cy.get('#events').type(`${Cypress.env('events')}`);
				cy.get('#hobbies').type(`${Cypress.env('hobbies')}`);
				cy.get('#submitButton').click();
				cy.url().should('contains', 'register');
			});

			it(`Verify user can Create/Register an Account/Profile ${size}`, () => {
				cy.get('#register').click();
				cy.get('#username').type(`${Cypress.env('username')}`);
				cy.get('#password').type(`${Cypress.env('password')}`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#address').type(`${Cypress.env('address')}`);
				cy.get('#dob').type(`${Cypress.env('dob')}`);
				cy.get('#events').type(`${Cypress.env('events')}`);
				cy.get('#hobbies').type(`${Cypress.env('hobbies')}`);
				cy.get('#submitButton').click();
				cy.get('.toast').should('contain', 'Registration Successful!');
				cy.url().should('contains', 'login');
			});

			it(`Verify an account cannot be duplicated using same username ${size}`, () => {
				cy.get('#register').click();
				cy.get('#username').type(`${Cypress.env('username')}`);
				cy.get('#password').type(`${Cypress.env('password')}`);
				cy.get('#secret').type(`${Cypress.env('secret')}`);
				cy.get('#address').type(`${Cypress.env('address')}`);
				cy.get('#dob').type(`${Cypress.env('dob')}`);
				cy.get('#events').type(`${Cypress.env('events')}`);
				cy.get('#hobbies').type(`${Cypress.env('hobbies')}`);
				cy.get('#submitButton').click();
				cy.get('.toast').should('contain', 'Username already exists');
			});
		});
		context('Create-Posts', () => {
			it(`Verify user can create post ${size}`, () => {
				cy.login();
				cy.get('#postText').type(`${Cypress.env('postText')}`);
				cy.get('#submitPost').click();
				cy.get('.toast').should('contain', 'New Post!');
			});
		});
	});
});
