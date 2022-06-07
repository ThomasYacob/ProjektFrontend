import {Component, OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import {User} from "../user";
import {TokenStorageService} from "../_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  currentUser: any;
  user1: any;

  id: number | undefined;
  user: User | undefined;
  message = '';
  constructor(private userService: UserService, private token: TokenStorageService,
              private eventBusService: EventBusService, private router: Router) { }

    roles: string[] = [];
    users: User[] | undefined;
    deleteMsg:string = "";

    ngOnInit(): void {
        this.currentUser = this.token.getUser();
        this.user1 = this.token.getUser();

        const user = this.token.getUser();
        this.roles = user.roles;

        console.log('All users ')
        this.userService.getAllUsers().subscribe(data => {
            console.log(data);
            this.users = data;
        })
    }

    updateUser(id: number) {
        this.router.navigate(['./users', id]);
    }

    onClickDelete(userId: number) {
        this.userService.deleteUser(userId)
            .subscribe(responseData => {
                this.deleteMsg = 'Successfully deleted';
                this.userService.getAllUsers().subscribe(data => {
                    console.log(data);
                    this.users = data;
                })
            }, (error: string) => {
                this.deleteMsg = error;
            });
        window.location.reload();
    }
}