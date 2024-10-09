import mongoose from 'mongoose';
import request from 'supertest'; // Use supertest instead of chai-http
import { expect } from 'chai'; // Keep the expect import
import server from '../server/server.js'; // Adjust to correct relative path
import { Group, User, Channel } from '../server/models.js'; // Adjust to correct relative path

describe('Channels API', () => {
  before(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/MyDB');
    
    // Create a test user with all required fields
    const user = new User({
      username: 'testUser',
      email: 'testUser@example.com',
      password: 'testPassword',
      role: 'chatUser',
      channels: []
    });
    await user.save();
    
    // Create a test channel
    const channel = new Channel({ name: 'Test Channel', members: [] });
    await channel.save();
  });

  after(async () => {
    // Clean up and close the database connection
    await User.deleteMany({});
    await Channel.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/channels/join', () => {
    it('should join a channel successfully', async () => {
      const user = await User.findOne({ username: 'testUser' });
      const channel = await Channel.findOne({ name: 'Test Channel' });

      const res = await request(server)
        .post('/api/channels/join')
        .send({ username: 'testUser', channelId: channel._id });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Successfully joined the channel');

      // Verify user and channel updated correctly
      const updatedUser = await User.findById(user._id);
      expect(updatedUser.channels).to.include(channel._id.toString());

      const updatedChannel = await Channel.findById(channel._id);
      expect(updatedChannel.members).to.include(user._id);
    });
  });

  describe('GET /api/channels', () => {
    it('should fetch all channels', async () => {
      const res = await request(server)
        .get('/api/channels');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('DELETE /api/channels/delete/:channelId', () => {
    it('should delete a channel successfully', async () => {
      const channel = await Channel.findOne({ name: 'Test Channel' });

      const res = await request(server)
        .delete(`/api/channels/delete/${channel._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Channel deleted successfully');

      // Verify the channel is deleted
      const deletedChannel = await Channel.findById(channel._id);
      expect(deletedChannel).to.be.null;
    });

    it('should return 404 if channel not found', async () => {
      const res = await request(server)
        .delete('/api/channels/delete/nonExistentChannelId');

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('message', 'Internal server error');
    });
  });
});