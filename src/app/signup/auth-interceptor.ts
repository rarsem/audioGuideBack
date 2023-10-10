// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { AuthService } from 'src/app/services/auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     constructor( private authService : AuthService){}
//     //angular will call this methode for requests living up
//     intercept( req : HttpRequest<any> , next : HttpHandler) {

//         const authToken = this.authService.getToken();

//         const authRequest = req.clone({
//             headers : req.headers.set('Authorization', "AnyWord " + authToken)
//         })

//         return next.handle(authRequest)

//     }
// }