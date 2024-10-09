describe('User Registration and Login', () => {
    const testUser = {
        username: 'testUser',
        password: '123456',
        email: 'testuser@example.com'
    };

    before(() => {
        // Cleanup if necessary
        cy.request('DELETE', 'http://localhost:3000/api/users/deleteAccount/testUserId'); // Replace with the actual ID
    });

    it('should register a new user', () => {
        cy.request('POST', 'http://localhost:3000/api/users/register', testUser)
            .its('status')
            .should('eq', 201);
    });

    it('should login with the new user', () => {
        cy.request('POST', 'http://localhost:3000/api/users/login', {
            username: testUser.username,
            password: testUser.password
        })
        .its('body')
        .should('include', { message: 'Login successful' });
    });

    // Add more tests for other endpoints as needed
});
