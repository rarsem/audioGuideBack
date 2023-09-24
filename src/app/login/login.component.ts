import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  username: string = '';
  password: string = '';

  constructor(private authService : AuthService){}

  onLogin(): void {
     // Call the login method from the authentication service
  this.authService.login(this.username, this.password);
    // Perform authentication logic here
    // Example: Make an HTTP request to your backend service
  }
}
