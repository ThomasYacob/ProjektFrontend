import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

}

// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../_services/user.service';
// import {User} from "../register/user";
// import {first} from "rxjs";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
//
// export class HomeComponent implements OnInit {
//   currentUser: User;
//   users = [];
//
//   constructor(
//       private authenticationService: AuthenticationService,
//       private userService: UserService
//   ) {
//     this.currentUser = this.authenticationService.currentUserValue;
//   }
//
//   ngOnInit() {
//     this.loadAllUsers();
//   }
//
//   deleteUser(username: string) {
//     this.userService.delete(username)
//         .pipe(first())
//         .subscribe(() => this.loadAllUsers());
//   }
//
//   private loadAllUsers() {
//     this.userService.getAll()
//         .pipe(first())
//         .subscribe(users => this.users = users);
//   }
// }