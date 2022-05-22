import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProfileComponent } from '../profile/profile.component';
import { TokenStorageService } from '../_services/token-storage.service';
import { DailyService } from '../_services/daily.service';
import { MonthlyService } from '../_services/monthly.service';
import { WeeklyService } from '../_services/weekly.service';
import { Monthly } from '../monthly-assignment/monthly';
import { Daily } from '../daily-assignment/daily';
import { Weekly } from '../weekly-assignment/weekly';
import { data } from 'jquery';
import { UseranswerService } from '../_services/useranswer.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";



  enum typeOfQuestion {
  Daily = 1 ,Weekly = 2,Monthly = 3
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  myForm = new FormGroup({
    rightAlternative: new FormControl(''),
  })

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
  constructor(private userService: UserService, private dailyService: DailyService,private monthlyService: MonthlyService, private weeklyService: WeeklyService, private userAnswerService: UseranswerService) { }

  monthlys?: Monthly[];
  monthlysActive?: Monthly;
  monthlysNotActive?: Monthly[];
  dailys?: Daily[];
  dailysActive?: Daily;
  dailysNotActive?: Daily[];
  weeklys?: Weekly[];
  weeklysActive?: Weekly;
  weeklysNotActive?: Weekly[];
  dailyAnswer?: String = '';
  weeklyAnswer?: String = '';
  Monthlyanswer? : String = '';
  alternative1 = '1'
  alternative2 = '2'
  alternative3 = '3'

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });

    let month: number = new Date().getMonth();
    let day: number = new Date().getDay();

    
    console.log('All monthly')
    this.monthlyService.getAllMonthly().subscribe(data => {
      console.log(data);
      this.monthlys = data;
    })

    /*if(this.monthlys){
    for (let index = 0; index < this.monthlysNotActive!.length; index++) {
      
      const element = this.monthlys[index];
      if(element.date.getMonth() == month)
      {
        this.monthlysActive = element;
      }
      else{
        
        
        this.monthlysNotActive![this.monthlysNotActive!.length] = element;
      }
      
    }
    }*/
    
    console.log("hej");
    console.log(this.monthlysActive);
    console.log(this.monthlysNotActive);
    console.log('All daily')


    this.dailyService.getAllDaily().subscribe(data => {
      console.log(data);
      this.dailys = data;
    })
    /*    
    for (let index = 0; index < this.dailys!.length; index++) {
      
      const element = this.dailys![index];
      if(element.date.getDay() == day)
      {
        this.dailysActive = element;
      }
      else{
        
        this.dailysNotActive![this.dailysNotActive!.length] = element;
      }
      
    }*/

    console.log('All weekly')
    this.weeklyService.getAllWeekly().subscribe(data => {
      console.log(data);
      this.weeklys = data;
    })

    /*// @ts-nocheck
    for (let index = 0; index < this.weeklys.length; index++) {
      // @ts-nocheck
      const element = this.weeklys[index];
      // @ts-nocheck
      if(element.date == Date.now)
      {
        this.weeklysActive = element;
      }
      else{
        // @ts-ignore
        this.weeklysNotActive[this.weeklysNotActive.length] = element;
      }
      
    }*/

    

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

    // @ts-ignore
    document.getElementById('days').innerText = this.days;
    // @ts-ignore
    document.getElementById('hours').innerText = this.hours;
    // @ts-ignore
    document.getElementById('mins').innerText = this.minutes;
    // @ts-ignore
    document.getElementById('seconds').innerText = this.seconds;

    setInterval(this.myTimer, 1000);
  }

  monthlySubmit(id: number) {
    this.userAnswerService.submitAnswer(this.Monthlyanswer, id, 2).subscribe( responseData => {
      console.log('Success!', responseData)
    },
        error => error);

  }
  weeklySubmit(id: number) {
    this.userAnswerService.submitAnswer(this.weeklyAnswer, id, 1).subscribe( responseData => {
      console.log('Success!', responseData)
    },
        error => error);
  }
  dailySubmit(id: number) {
    var answer = this.myForm.get('rightAlternative')?.value;
    console.log(answer);
  
    this.userAnswerService.submitAnswer(answer, id, 0).subscribe( responseData => {
      console.log('Success!', responseData)
    },
        error => error);

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