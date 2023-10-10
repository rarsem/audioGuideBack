import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  isAuthenticated: boolean = false;



    constructor( public authService : AuthService) {}

    ngOnInit(){
        // this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus=>{
        //     this.isLoading = false
        // })
        this.isAuthenticated = this.authService.isAuthenticated();
    }

   

    onSignup(form : NgForm){
        if(form.invalid) return;
        this.isLoading = true;
        this.authService.createUser( form.value.email, form.value.password )
        //console.log(form.value)
    }

}
