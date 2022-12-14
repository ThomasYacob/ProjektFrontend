import { Component, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import {Subscription} from "rxjs";
import {EventBusService} from "./_shared/event-bus.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService,
              private router: Router) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('Admin');
      this.showModeratorBoard = this.roles.includes('ContentCreator');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    })
  }

  ngOnDestroy(): void {
    if(this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
    this.router.navigate(['./login']);
  }
}
