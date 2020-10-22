Cypress.Commands.add('login', (password) => {
	password = password || `${Cypress.env('password')}`;
	cy.visit(`${Cypress.env('host')}`);
	cy.get('#username').type(`${Cypress.env('username')}`);
	cy.get('#password').type(password);
	cy.get('#submitButton').click();
	cy.get('.toast').should('contain', `Welcome, ${Cypress.env('username')}`);
	cy.url().should('contains', `profile/${Cypress.env('username')}`);
});

Cypress.Commands.add('deleteAccount', () => {
	cy.get('#userProfile').click();
	cy.get('#deleteButton').click();
	cy.get('#deleteWarning').should('be.visible');
	cy.get('#submitDelete').click();
	cy.get('.toast').should('contain', `Deleted!`);
	cy.url().should('contains', `login`);
});

Cypress.Commands.add('createPost', () => {
	cy.get('#postText').type(`${Cypress.env('postText')}`);
	cy.get('#submitPost').click();
	cy.get('.toast').should('contain', 'New Post!');
});

Cypress.Commands.add('deletePost', () => {
	cy.get('#delete').click();
	cy.get('#deleteWarning').should('be.visible');
	cy.get('#submitDelete').click();
	cy.get('.toast').should('contain', 'Deleted!');
});

Cypress.Commands.add('createAccount', () => {
	cy.visit(`${Cypress.env('host')}`);
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

Cypress.Commands.add('editPost', () => {
	cy.get('#editButton').click();
	cy.get('#backButton').click(); // test the back button works
	cy.get('#editButton').click();
	cy.get('#post_content').clear();
	cy.get('#post_content').type(`${Cypress.env('postUpdateText')}`);
	cy.get('#saveButton').click();
	cy.get('.toast').should('contain', 'Updated!');
	cy.url().should('contain', `profile/${Cypress.env('username')}`);
});

Cypress.Commands.add('editProfile', () => {
	cy.get('#userProfile').click();
	cy.get('#address').clear();
	cy.get('#address').type(`${Cypress.env('addressUpdateText')}`);
	cy.get('#submitButton').click();
	cy.get('.toast').should('contain', 'Updated!');
	cy.url().should('contain', `profile/${Cypress.env('username')}`);
});
