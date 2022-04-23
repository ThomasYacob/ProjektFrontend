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

  userModel = new User('robert', 'hejsan1s', 'rob@test.com')

  constructor(private _enrollmentService: EnrollmentService) {}

  onSubmit() {
    this._enrollmentService.enroll(this.userModel)
        .subscribe(
            data => console.log('Success!', data),
            error => console.error('Error!', error)
        )
  }
  
}
