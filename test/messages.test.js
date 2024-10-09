import request from 'supertest';
import { expect } from 'chai';
import server from '../server/server.js'; // Adjust the path as needed
import { Message } from '../server/models.js'; // Import your models for seeding

describe('Messages API', () => {
    // Ensure test data is set up before running tests
    before(async () => {
        await Message.deleteMany({});
    });

    // Test for sending a message
    describe('POST /api/messages', () => {
        it('should send a message', async () => {
            const messageData = {
                username: 'testuser',
                text: 'Hello, this is a test message!',
            };

            const res = await request(server)
                .post('/api/messages')
                .send(messageData);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('username', messageData.username);
            expect(res.body).to.have.property('text', messageData.text);
            expect(res.body).to.have.property('timestamp'); // Check if timestamp is present
        });
    });
});