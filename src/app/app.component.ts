// import { Component, OnInit} from '@angular/core';
// import { TokenStorageService } from './_services/token-storage.service';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   private roles: string[] = [];
//   isLoggedIn = false;
//   showAdminBoard = false;
//   showModeratorBoard = false;
//   username?: string;
//   constructor(private tokenStorageService: TokenStorageService) { }
//   ngOnInit(): void {
//     this.isLoggedIn = !!this.tokenStorageService.getToken();
//     if (this.isLoggedIn) {
//       const user = this.tokenStorageService.getUser();
//       this.roles = user.roles;
//       this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
//       this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
//       this.username = user.username;
//     }
//   }
//   logout(): void {
//     this.tokenStorageService.signOut();
//     window.location.reload();
//   }
// }

import { Component, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
