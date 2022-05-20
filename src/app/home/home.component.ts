import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { DailyService } from '../_services/dailyservice';
import { MonthlyService } from '../_services/monthlyservice';
import { WeeklyService } from '../_services/weeklyservice';
import { Monthly } from '../monthly-assignment/monthly';
import { Daily } from '../daily-assignment/daily';
import { Weekly } from '../weekly-assignment/weekly';
import { data } from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentUser: any;
  content?: string;
  currentDate: any;
  targetDate: any;
  cDateMillisecs: any;
  tDateMillisecs: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  year: number = 2022;
  month: number = 5;
  months: String[] = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ];
  day: number = 5;
  constructor(private userService: UserService, private dailyService: DailyService,private monthlyService: MonthlyService, private weeklyService: WeeklyService) { }

  monthlys: Monthly[] | undefined;
  dailys: Daily[] | undefined;
  weeklys: Weekly[] | undefined;



  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    
    console.log('All monthly')
    this.monthlyService.getAllMonthly().subscribe(data => {
      console.log(data);
      this.monthlys = data;
    })
    console.log('All daily')
    this.dailyService.getAllDaily().subscribe(data => {
      console.log(data);
      this.dailys = data;
    })
    console.log('All weekly')
    this.weeklyService.getAllWeekly().subscribe(data => {
      console.log(data);
      this.weeklys = data;
    })
    

  }

  ngAfterViewInit() {
    this.myTimer();
  }

  myTimer() {

    this.currentDate = new Date();
    this.targetDate = new Date(2022, 5, 5);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    // // @ts-ignore
    // document.getElementById('days').innerText = this.days;
    // // @ts-ignore
    // document.getElementById('hours').innerText = this.hours;
    // // @ts-ignore
    // document.getElementById('mins').innerText = this.minutes;
    // // @ts-ignore
    // document.getElementById('seconds').innerText = this.seconds;

    setInterval(this.myTimer, 1000);
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