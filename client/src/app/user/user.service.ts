import { Injectable } from '@angular/core';

interface User {
  username: string;
  email: string;
  id: number;
  roles: string[];
  groups: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { username: 'super', email: 'super@example.com', id: 1, roles: ['Super Admin'], groups: [] },
  ];

  private nextId: number = 2; // Initialize the next available ID

  currentUser: User | null = null;

  authenticate(username: string, password: string): boolean {
    if (username === 'super' && password === '123') {
      this.currentUser = this.users.find(user => user.username === username) || null;
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  addUser(username: string, email: string, roles: string[] = [], groups: string[] = []): boolean {
    // Check if the username already exists
    if (this.users.find(user => user.username === username)) {
      return false; // Username already exists
    }

    // Create a new user with a unique ID
    const newUser: User = {
      username,
      email,
      id: this.nextId,
      roles,
      groups,
    };

    // Add the new user to the list
    this.users.push(newUser);

    // Increment the next available ID
    this.nextId++;

    return true; // User added successfully
  }
}