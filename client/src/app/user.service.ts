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
    const url = `${this.baseUrl}/${userId}`;
    console.log('Making DELETE request to:', url); // Debugging line
    return this.http.delete(url);
  }
}
