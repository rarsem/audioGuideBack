
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router

import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  isLoading = false
  isAuthenticated: boolean = false;

  constructor(public authService : AuthService , private router : Router,
    private notificationService : NotificationService) {}

  onLogin(form : NgForm){
      if(form.invalid) return;
      this.isLoading = true;
      this.authService.login(form.value.email , form.value.password).subscribe(
    (response: any) => {
      console.log(response);

      if (response.token) {
        // Store the token securely and handle the successful login
        // Store the token in local storage
        localStorage.setItem('token', response.token);
        // Store token expiration timestamp (adjust as needed)
        const expirationTime = new Date().getTime() + response.expiresIn * 1000;
        localStorage.setItem('tokenExpiration', expirationTime.toString());

        // Redirect to /circuits after successful login
        this.router.navigate(['/circuits']);

        // Display a success notification
        this.isLoading = false;

        this.notificationService.showSuccess('Login successful');
      }
    },
    (error: any) => {
      if (error.status === 401) {
        // Show an error notification for authentication failure
        this.notificationService.showError('Authentication failed');
        this.isLoading = false;
      } else {
        // Handle other errors, e.g., display an error message to the user
        console.error(error);
      }
    }
  );
  }

  ngOnInit(){
      // this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus=>{
      //     this.isLoading = false
      // })
      
  }

  // ngOnDestroy(){
  //     this.authStatusSub.unsubscribe()
  // }
}
