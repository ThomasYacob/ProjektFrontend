import { Component, OnInit} from '@angular/core';
import { User } from './user';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userModel = new User('', 'hejsan', 'rob@test.com')
}
