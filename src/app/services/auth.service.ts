// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { globalConstant } from '../global-variable';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private loggedIn = new BehaviorSubject<boolean>(false); // Tracks login status

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    this.loggedIn.next(!!token);
  }

  // Observable to track login status
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(`${globalConstant.apiUrl}auth/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.token); // Store token
          this.loggedIn.next(true); // Update login status 
        }),
        catchError(this.handleError)
      );
  }

  // Logout method-- yet to implement from ui
  logout() {
    localStorage.removeItem('access_token'); // Remove token
    this.loggedIn.next(false); // Update login status
    this.router.navigate(['/login']); // Navigate to login page
  }

  // Error handling, this error handle we can implement globally thos http interceptor
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.detail || error.message}`;
    }
    return throwError(errorMessage);
  }
}
