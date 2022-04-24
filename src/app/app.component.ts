import { Component, OnInit} from '@angular/core';
import { User } from './user';
import { TokenStorageService } from './_services/token-storage.service';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
