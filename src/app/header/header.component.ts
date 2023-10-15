import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router : Router){

  }

  logout() {
    // Clear the token and token expiration timestamp
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  
    // Optionally, you can also clear other user-related data from local storage
  
    // Redirect to a login page (You should define your login route)
    this.router.navigate(['/login']);
  }
}
