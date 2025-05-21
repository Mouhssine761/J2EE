// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = '/api/auth';
  private readonly tokenKey = 'jwt';

  constructor(private http: HttpClient) {}

  /**
   * Call the backend /login endpoint.
   * On success, stores the JWT in localStorage.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { username: email, password })
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
        })
      );
  }

  /**
   * Call the backend /register endpoint.
   */
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username: email,
      password
    });
  }

  /**
   * Remove JWT from storage.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Retrieve the current JWT, if any.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Simple helper to see if user is (probably) logged in.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
