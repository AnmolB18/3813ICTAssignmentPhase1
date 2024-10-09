import request from 'supertest';
import { expect } from 'chai';
import server from '../server/server.js'; // Adjust the path as needed
import { Group, User } from '../server/models.js'; // Import your models for seeding

describe('Groups API', () => {
    // Ensure test data is set up before running tests
    before(async () => {
        await Group.deleteMany({});
        await User.deleteMany({});

        // Create a test group and user
        const testGroup = new Group({ name: 'TestGroup', requests: [] });
        await testGroup.save();

        const testUser = new User({ username: 'testuser', groups: [], requestedGroups: [] });
        await testUser.save();
    });

    // Test for getting all groups
    describe('GET /api/groups', () => {
        it('should get all groups', async () => {
            const res = await request(server).get('/api/groups');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array'); // Expecting an array of groups
        });
    });

    // Test for requesting to join a group
    describe('POST /api/groups/requestJoin', () => {
        it('should send a join request', async () => {
            const res = await request(server)
                .post('/api/groups/requestJoin')
                .send({ username: 'testuser', groupName: 'TestGroup' });
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Join request sent');
        });
    });

    // Test for approving a join request
    describe('POST /api/groups/approve-request', () => {
        it('should approve a join request', async () => {
            const res = await request(server)
                .post('/api/groups/approve-request')
                .send({ username: 'testuser', groupName: 'TestGroup' });
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('User approved successfully');
        });
    });

    // Test for removing a username from the requests array
    describe('POST /api/groups/remove-from-requests', () => {
        it('should remove username from requests', async () => {
            const res = await request(server)
                .post('/api/groups/remove-from-requests')
                .send({ username: 'testuser', groupName: 'TestGroup' });
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Username removed from requests array');
        });
    });

    // Test for retrieving requested groups for a user
    describe('GET /api/user/requested-groups', () => {
        it('should retrieve requested groups for a user', async () => {
            const res = await request(server)
                .get('/api/user/requested-groups')
                .set('Authorization', 'Bearer yourTokenHere'); // Adjust according to your auth implementation
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('username');
            expect(res.body).to.have.property('groupName');
        });
    });

    // Test for deleting a group
    describe('DELETE /api/groups/delete/:groupName', () => {
        it('should delete a group by name', async () => {
            const res = await request(server)
                .delete('/api/groups/delete/TestGroup');
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('Group TestGroup deleted successfully');
        });
    });
});
