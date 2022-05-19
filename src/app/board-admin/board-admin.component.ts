import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';
import {User} from "../register/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService, private eventBusService: EventBusService) { }

  // ngOnInit(): void {
  //   this.userService.getAdminBoard().subscribe(
  //       data => {
  //         this.content = data;
  //       },
  //       err => {
  //         this.content = err.error.message || err.error || err.message;
  //
  //         if (err.status === 403)
  //           this.eventBusService.emit(new EventData('logout', null));
  //       }
  //   );
  // }

    users: User[] | undefined;
    user: User | undefined;
    deleteMsg:string = "";
    // @ts-ignore
    @ViewChild('closebutton') closebutton;

    ngOnInit(): void {
        console.log('All users ')
        this.userService.getAllUsers().subscribe(data => {
            console.log(data);
            this.users = data;
        })
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
    }

    userUpdateForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('')
    })

    onClickUpdate(userId: number) {
        this.userService.getUserById(userId)
            .subscribe(responseData => {
                this.user = responseData;
                console.log(this.user);
                this.prepareUpdateForm();
            });
    }

    prepareUpdateForm() {
        this.userUpdateForm.setValue({
            username: this.user?.username,
            email: this.user?.email,
            password: this.user?.password
        });
    }

    onSubmit() {
        let user = new User(<number>this.user?.id, <string>this.user?.username, <string>this.user?.email, <string>this.user?.password);
        user.username = this.userUpdateForm.value.username;
        user.email = this.userUpdateForm.value.email;
        user.password = this.userUpdateForm.value.password;
        this.userService.updateUser(user).subscribe(responseDate => {
                this.closebutton.nativeElement.click();
                this.userService.getAllUsers().subscribe(data => {
                    this.users = data;
                })
            },
            (error: any) => console.log(error));
    }
}