// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
//
// @Component({
//     selector: 'app-login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//     // @ts-ignore
//     username: string;
//     // @ts-ignore
//     password: string;
//     errorMessage = 'Invalid Credentials';
//     // @ts-ignore
//     successMessage: string;
//     invalidLogin = false;
//     loginSuccess = false;
//
//     constructor(private authService: AuthService) {}
//
//     ngOnInit(): void {
//     }
//
//     handleLogin() {
//         this.authService.login(this.username, this.password).subscribe((result) => {
//             this.invalidLogin = false;
//             this.loginSuccess = true;
//             this.successMessage = 'Login Successful';
//             // redirect to main page
//         }, () => {
//             this.invalidLogin = true;
//             this.loginSuccess = false;
//         });
//     }
//
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  successMessage: string | undefined;
  // successMessage = this.string;
  roles: string[] = [];
  errorMsg: any;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe((data) =>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.successMessage = 'Login Successful';
        this.ngOnInit();
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        // this.router.navigate(['/home']);
      }, () => {
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      });
    }

  reloadPage(): void {
    window.location.replace('/home');
  }
}

// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
// import { TokenStorageService } from '../_services/token-storage.service';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   form: any = {
//     username: null,
//     password: null
//   };
//   isLoggedIn = false;
//   isLoginFailed = false;
//   errorMessage = '';
//   roles: string[] = [];
//   constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
//   ngOnInit(): void {
//     if (this.tokenStorage.getToken()) {
//       this.isLoggedIn = true;
//       this.roles = this.tokenStorage.getUser().roles;
//     }
//   }
//   onSubmit(): void {
//     const { username, password } = this.form;
//     this.authService.login(username, password).subscribe(
//         data => {
//           this.tokenStorage.saveToken(data.accessToken);
//           this.tokenStorage.saveUser(data);
//           this.isLoginFailed = false;
//           this.isLoggedIn = true;
//           this.roles = this.tokenStorage.getUser().roles;
//           this.reloadPage();
//         },
//         err => {
//           this.errorMessage = err.error.message;
//           this.isLoginFailed = true;
//         }
//     );
//   }
//   reloadPage(): void {
//     window.location.reload();
//   }
// }