import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users';

  private baseUrl = 'http://localhost:5000/api/users'; // Adjust the URL to match your backend API
  userService: any;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  deleteAccount(userId: string): Observable<any> {
    console.log(`Attempting to delete account for user ID: ${userId}`);
    return this.http.delete(`${this.apiUrl}/deleteAccount/${userId}`);
  }
}
