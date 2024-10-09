# Chat System

## Introduction
This project is a text and video chat system that enables users to communicate with each other in real-time within various groups and channels. It is built using the MEAN stack (MongoDB, Express, Angular, Node) along with Socket.io for real-time communication and Peer.js for video streaming.

## Features
The chat system includes three levels of permissions:
- **Super Admin**
- **Group Admin**
- **User**

### Group
- Groups consist of chat users, with permissions granted by a Group Admin or Super Admin.
- Users can belong to multiple groups.
- Groups may have multiple admins.
- Group Admins can manage more than one group.
- Super Admins can promote users to Group Admins and access all groups.

### Channel
- Channels are subgroups within groups dedicated to chatting.
- Users who are part of a group can join any channel within that group.

### Users
- Users are identified by a unique username, email, and assigned roles and groups.
- Users can join or leave groups and participate in channels associated with those groups.
- Users have the option to delete their accounts or log out.

### Messages
- Messages are transmitted in real-time within channels.
- Each message is stored in the database with the sender's username, text content, and a timestamp.

## User Roles
- **Super Administrator**: 
  - Can promote users to Group Admins or Super Admins.
  - Can remove users and possesses all the functionalities of a Group Admin.
  - Has access to all groups and channels.
  
- **Group Administrator**:
  - Can create and manage groups and channels.
  - Can remove users from the groups they administer.
  - Can ban users from channels and report them to Super Admins.

- **Chat User**:
  - Can create a new chat user account.
  - Can join groups and channels.
  - Can express interest in groups and exit groups.

## User Authentication
- The initial setup includes a Super Admin with the username `superAdmin` and password `123`.
- Users must authenticate using a username and password.
- Authenticated users can access features based on their role.

## Data Storage
- In the first phase, browser-based local storage is utilized for storing data structures.
- MongoDB will be introduced in the second phase for persistent storage.

## Documentation

### Git Repository Organization
- **Branching**: The project follows a feature-branching model, where each feature or bug fix is developed in a separate branch.
- **Update Frequency**: Regular commits are made to the repository to track progress and maintain a history of changes.
  
**Structure:**
- `server/`: Contains the Node.js backend, including Express routes, socket handlers, and Peer.js integration.
- `client/`: Contains the Angular frontend, including components, services, and models.

### Data Structures
**Client-Side**
- **User**: 
{ "username": "string", "email": "string", "id": "string", "roles": ["string"], "groups": ["string"], "channels": ["string"] }


- **Groups**:
{ "id": "string", "name": "string", "adminIds": ["string"], "channelIds": ["string"] }


- **Channel**:
{ "id": "string", "groupId": "string", "name": "string", "userIds": ["string"], "messages": ["Message"] }


- **Message**:
{ "username": "string", "text": "string", "timestamp": "Date" }

**Server-Side**
- **User Schema**: 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
  groups: { type: [String], required: true },
  channels: { type: [String], required: true }
});

- **Group Schema**:
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminIds: { type: [String], required: true },
  channelIds: { type: [String], required: true }
});

- **Channel Schema**:
const channelSchema = new mongoose.Schema({
  groupId: { type: String, required: true },
  name: { type: String, required: true },
  userIds: { type: [String], required: true },
  messages: { type: [messageSchema], default: [] }
});

- **Message Schema**:
const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

### Angular Architecture
- Components: LoginComponent, GroupComponent, ChannelComponent, ChatComponent, AdminDashboardComponent
- Services: AuthService, GroupService, ChannelService, ChatService
- Models: User, Group, Channel, Message

### Routes
- `/login:` Displays the login page.
- `/groups:` Displays the groups the user is a member of.
- `/channels/:groupId:` Displays the channels within a group.
- `/chat/:channelId:` Displays the chat interface for a channel.
- `/admin:` Displays the admin dashboard for Super Admins and Group Admins.

### Node Server Architecture
- **Modules**:
- auth.js
- groups.js
- channels.js
- chat.js
- admin.js
- messages.js

- **Functions**:
- login
- register
- createGroup
- deleteGroup
- createChannel
- deleteChannel
- sendMessage
- promoteUser

### Files
- `server.js:` Entry point of the Node.js application.
- `routes/:` Contains route handlers for different functionalities.
- `models/:` Contains Mongoose models (for the second phase).

- Global Variables:
- `io` (socket.io instance)
- `peerServer` (Peer.js server instance)
  
### Server-Side Routes

- `POST /login:` Authenticates a user and returns a token.
- `POST /register:` Registers a new user.
- `POST /api/channels/join:` Joins a channel.
- `GET /api/channels:` Retrieves channels for a group.
- `DELETE /api/channels/delete/:id:` Deletes a channel.
- `POST /requestJoin:` Requests to join a group.
- `POST /api/groups/approve-request:` Approves a user's request to join a group.
- `POST /api/groups/remove-from-requests:` Removes a user from a group's requests.
- `GET /api/user/requested-groups:` Retrieves the groups a user has requested to join.
- `POST /join-group:` Joins a group.
- `POST /joinChannel:` Joins a channel.
- `POST /create-group:` Creates a new group.
- `POST /create-channel:` Creates a new channel.
- `GET /groups:` Retrieves all groups.
- `DELETE /api/users/deleteAccount/:id:` Deletes a user account.
- `DELETE /api/users/deleteUser/:username:` Deletes a user by username.
- `PATCH /api/users/promote/:id:` Promotes a user to Group Admin or Super Admin.
- `PATCH /api/users/demote/:id:` Demotes a user.
- `GET /api/users:` Retrieves all users.

### Testing

- **Front-End Testing with Cypress**
For front-end testing, Cypress is used to ensure that the Angular components and user flows operate as intended.

- **Running the Tests**
  To execute the Cypress tests, follow these steps

- **Ensure you are in the client/ folder**:
cd client

- **Install the Cypress testing framework (if not already installed)**:
npm install cypress --save-dev

- **Open Cypress and run the tests**:
 npx cypress open

This will open the Cypress Test Runner, where you can view and execute the test cases.

- **Cypress Test Coverage**
The following components and user flows are tested using Cypress:

- User Authentication: Ensures that users can register, log in, and log out.
- Group Management: Admins can create, delete, and manage groups.
- Channel Management: Admins can create, delete, and manage channels within a group.
- Messaging: Tests the sending and receiving of messages in real-time.
- Join Requests: Tests for group join requests and admin approvals.

Cypress provides a visual test runner, allowing you to view each test case and its results in real-time. This ensures the application functions correctly during development and after code modifications.

### Back-End Testing with Mocha and Chai
Mocha and Chai are employed to test the server-side routes and functionalities.

- **Running the Tests**
To execute the Mocha tests, follow these steps:

- **Navigate to the server directory**:
  json cd server

- **Ensure Mocha and Chai are installed**:
  npm install mocha chai --save-dev

- **Run the tests**:
  npx mocha

- **Mocha Test Coverage**
The following server functionalities are tested using Mocha and Chai:
- User Registration: Verifies that users can register successfully.
- User Authentication: Ensures that users can log in with valid credentials.
- Group and Channel Creation: Tests the creation and deletion of groups and channels.
- Message Sending: Tests that messages can be sent and stored correctly.
- Join Requests: Validates the handling of user requests to join groups.

### Future Enhancements
- Implement a more robust user role and permission management system.
- Add features for private messaging between users.
- Improve the user interface for better usability.
- Enhance video streaming capabilities with additional features like screen sharing.
  
### Conclusion
This chat system serves as a foundation for real-time communication applications and can be expanded with various enhancements based on user feedback and requirements. With its modular design and robust features, it aims to provide a seamless experience for users in both text and video communication.
