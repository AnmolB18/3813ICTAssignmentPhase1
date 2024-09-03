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
  
  // Add methods for adding/updating/removing users, etc.
}
