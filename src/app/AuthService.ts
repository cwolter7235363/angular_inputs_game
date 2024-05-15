import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
 
  constructor() { }
 
  // Simulate login functionality
  login(username: string, password: string): Observable<boolean> {
    // In a real app, this would be replaced with actual authentication logic
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      return of(true).pipe(delay(1000)); // Simulate delay for async operation
    } else {
      return of(false).pipe(delay(1000)); // Simulate delay for async operation
    }
  }
 
  // Simulate logout functionality
  logout(): void {
    this.isAuthenticated = false;
  }
 
  // Check if user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}