import { Component, OnInit} from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
userModel = new User("","","");
  submitted = false;
  errorMsg = '';

  constructor(private _enrollmentService: EnrollmentService) {}

  onSubmit() {
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
        .subscribe(
            data => console.log('Success!', data),
            error => this.errorMsg = error.statusText
        )
  }
}