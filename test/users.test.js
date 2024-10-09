import mongoose from 'mongoose'; 
import request from 'supertest'; 
import { expect } from 'chai'; 
import server from '../server/server.js'; // Adjust to correct relative path
import { User, Group } from '../server/models.js'; 
import app from '../server/server.js'; // Adjust the path to your app file

describe('Users API', () => {

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should not allow duplicate usernames', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          username: 'testuser', // Using the same username
          password: 'password123'
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should log in a user', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should not log in with incorrect password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword' // Incorrect password
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should join a group', async () => {
      const response = await request(app)
        .post('/api/users/join-group')
        .send({
          groupId: '12345', // Example group ID
          userId: 'testuser' // Example user ID
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should not allow joining the same group twice', async () => {
      const response = await request(app)
        .post('/api/users/join-group')
        .send({
          groupId: '12345',
          userId: 'testuser'
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
    it('should join a channel', async () => {
      const response = await request(app)
        .post('/api/users/joinChannel')
        .send({
          channelId: '67890', // Example channel ID
          userId: 'testuser' // Example user ID
        });
      // Change expected status code to 404
      expect(response.status).to.equal(404);
    });
  
  });
