
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  isLoading = false
  isAuthenticated: boolean = false;

  constructor(public authService : AuthService) {}

  onLogin(form : NgForm){
      if(form.invalid) return;
      this.isLoading = true;
      this.authService.login(form.value.email , form.value.password)
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
