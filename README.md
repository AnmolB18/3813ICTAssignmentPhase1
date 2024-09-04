Chat System for 3813ICT Assignment
Project Summary
This project is a fully functional text and video chat system that facilitates real-time communication among users within various groups and channels. It's built using the MEAN stack (MongoDB, Express, Angular, Node.js), with real-time messaging powered by Socket.io and video streaming enabled through Peer.js.

Core Features
The system supports three different user roles:

Super Admin
Group Admin
User
Groups and Channels
Groups: Groups are collections of users with specific permissions managed by either Group Admins or Super Admins. Users can be part of multiple groups, and a group can have multiple administrators. Super Admins have the ability to promote users to Group Admin status and can manage all groups across the system.

Channels: Channels are subgroups within a group intended for specialized discussions. Any user who belongs to a group can join any channel within that group.

User Management
Users are identified by a unique combination of username, email, roles, and associated groups. They can join or leave groups and channels as they wish. Users can also delete their accounts or log out of the system.

Roles and Responsibilities
Super Admin:

Can promote users to Group Admin or other Super Admins.
Can remove users and perform all actions available to Group Admins.
Has unrestricted access to all groups and channels.
Group Admin:

Manages group and channel creation.
Can remove or ban users from groups or channels and report issues to Super Admins.
Chat User:

Can create an account, join groups, and participate in channels.
Has the ability to leave groups at any time.
Authentication and Security
The system includes a default Super Admin account with credentials (super and 123). Users must log in with valid credentials to access the system. Once authenticated, users can perform actions according to their role.

Data Management
Initially, data is managed using local storage in the browser. MongoDB will be introduced later to provide persistent data storage.

Documentation
Repository Structure and Workflow

Branching Model: The project uses a feature-based branching approach, where each new feature or bug fix is developed in a separate branch.
Commit Policy: Frequent commits ensure progress tracking and maintain a detailed history of changes.
Directory Structure:
server/: Contains the Node.js backend with Express routes, Socket handlers, and Peer.js integration.
client/: Houses the Angular frontend, including components, services, and models.
Data Models

User: { username: string, email: string, id: string, roles: string[], groups: string[] }
Group: { id: string, name: string, adminIds: string[], channelIds: string[] }
Channel: { id: string, groupId: string, name: string, userIds: string[] }
Angular Application Structure

Components: LoginComponent, GroupComponent, ChannelComponent, ChatComponent, AdminDashboardComponent
Services: AuthService, GroupService, ChannelService, ChatService
Models: User, Group, Channel
Routes:
/login: User login page.
/groups: Displays the user's groups.
/channels/:groupId: Shows channels within a group.
/chat/:channelId: Chat interface for a specific channel.
/admin: Admin dashboard for Super Admins and Group Admins.
Backend Architecture
Modules: auth.js, groups.js, channels.js, chat.js, admin.js

Core Functions: login, register, createGroup, deleteGroup, createChannel, deleteChannel, sendMessage, promoteUser

Files:

server.js: The main entry point for the Node.js application.
routes/: Holds route handlers for different functionalities.
models/: Contains Mongoose models (for MongoDB, to be used in phase two).
Global Variables: io (Socket.io instance), peerServer (Peer.js server instance)

API Endpoints

POST /login: Authenticates a user and returns a token.
POST /register: Creates a new user account.
GET /groups: Retrieves the groups for the authenticated user.
POST /groups: Creates a new group (Group Admin only).
DELETE /groups/: Deletes a group (Group Admin only).
POST /channels: Adds a new channel to a group (Group Admin only).
DELETE /channels/: Removes a channel from a group (Group Admin only).
POST /messages: Sends a message to a channel.
POST /promote: Elevates a user to Group Admin status (Super Admin only).
Client-Server Interaction
Login Process: Users submit login details through AuthService; the server validates credentials and returns a token. The token is stored on the client-side, and the application shows the user's groups.

Group Management: Admins can create or delete groups using GroupService. The server updates the database, and the Angular frontend reflects these changes.

Channel Management: Admins manage channels via ChannelService, with server-side updates reflected on the frontend.

Chat Functionality: Messages are sent via ChatService using Socket.io, with real-time updates in the Angular app.

Getting Started
Requirements:

Node.js
Angular CLI
MongoDB (to be used in phase two)
Installation:

Clone the repository: git clone https://github.com/AnmolB18/3813ICTAssignmentPhase1.git
Set up the project directories:
cd server: For the backend setup.
cd client: For the frontend setup.
Install dependencies:
Run npm install in both directories.
Start the backend server:
Run npm start in the server directory.
Start the frontend client:
Run ng serve in the client directory.
Access the application at http://localhost:4200.
