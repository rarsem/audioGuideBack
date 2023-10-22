// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import the Router
import { AuthData } from "src/app/signup/auth-data.model"

import {environment}  from "src/environments/environment"

const BACKEND_URL = environment.apiUrl + "/api/user"


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  // User authentication method
  login(email: string, password: string) {

    const authdata : AuthData  = { email : email , password : password} 
    return  this.http.post<{token : string, expiresIn : number}>(BACKEND_URL+"/login" , authdata)
        
  }

  createUser(email: string, password: string) {

    const authdata : AuthData  = { email : email , password : password} 
    this.http.post(BACKEND_URL+"/signup" , authdata)
    .subscribe( (response : any )=> {
          console.log(response)
          if (response.token) {
            // Store the token in local storage
            //localStorage.setItem('token', response.token);
            // Store token expiration timestamp (adjust as needed)
            //const expirationTime = new Date().getTime() + response.expiresIn * 1000;
            //.setItem('tokenExpiration', expirationTime.toString());
  
            // Redirect to /circuits after successful login
            //this.router.navigate(['/circuits']);
          }
        
    }, (error : any ) => {
      return of(error);        
    })
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    // Check if the token exists and is not expired
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token || !expiration) {
      return false;
    }

    const currentTime = new Date().getTime();
    return currentTime < +expiration;
  }

  // Log out the user
  logout(): void {
    // Remove the token and token expiration from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
}