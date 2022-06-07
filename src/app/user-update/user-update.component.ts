import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  // @ts-ignore
    id: number;
  // @ts-ignore
    user: User;
  disableSelect = new FormControl(false);
  roles: string[] = [];


    constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = new User();

    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id)
        .subscribe(data => {
          console.log(data)
          this.user = data;
        }, error => console.log(error));
  }

  updateUser() {
    this.userService.updateUser(this.id, this.user)
        .subscribe(data => {
          console.log(data);
            // @ts-ignore
            this.user = new User();
          this.goToList();
        }, error => console.log(error));
  }

  onSubmit() {
    this.updateUser();
  }

  goToList() {
    this.router.navigate(['/admin']);
  }

}