import { Injectable } from '@angular/core';
import { Router} from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router : Router ){}

  login(username : string , password : string): void {
    // Implement login logic here
    // // Set isAuthenticated to true after successful login
    console.log('test me')
    this.isAuthenticated = true;
    this.router.navigate(['/circuits'])
  }

  logout(): void {
    // Implement logout logic here
    // Set isAuthenticated to false after logout
    this.isAuthenticated = false;
  }

  getisAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}