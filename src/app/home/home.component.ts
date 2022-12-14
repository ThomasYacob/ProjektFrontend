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
  // currentDate: any;
  // targetDate: any;
  // cDateMillisecs: any;
  // tDateMillisecs: any;
  // difference: any;
  // seconds: any;
  // minutes: any;
  // hours: any;
  // days: any;
  // year: number = 2022;
  // month: number = 5;
  // months: String[] = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'Aug',
  //   'Sept',
  //   'Oct',
  //   'Nov',
  //   'Dec'
  // ];
  // day: number = 5;
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
  submitMsg?: String = '';

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


    this.monthlyService.getCurrentMonthly().subscribe(data => {
      this.monthlysActive = data;
    })

    this.monthlyService.getMonthlyInactive().subscribe(data => {
      this.monthlysNotActive = data;
    })
    console.log('All daily')


    this.dailyService.getAllDaily().subscribe(data => {
      console.log(data);
      this.dailys = data;
    })

    this.dailyService.getCurrentDaily().subscribe(data =>{
      this.dailysActive = data;
    })
    console.log("Active Dailys");
    console.log(this.dailysActive);

    this.dailyService.getDailyInactive().subscribe(data =>{
      this.dailysNotActive = data;
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

    // this.currentDate = new Date();
    // this.targetDate = new Date(2022, 5, 5);
    // this.cDateMillisecs = this.currentDate.getTime();
    // this.tDateMillisecs = this.targetDate.getTime();
    // this.difference = this.tDateMillisecs - this.cDateMillisecs;
    // this.seconds = Math.floor(this.difference / 1000);
    // this.minutes = Math.floor(this.seconds / 60);
    // this.hours = Math.floor(this.minutes / 60);
    // this.days = Math.floor(this.hours / 24);
    //
    // this.hours %= 24;
    // this.minutes %= 60;
    // this.seconds %= 60;
    // this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    // this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    // this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    //
    // // @ts-ignore
    // document.getElementById('days').innerText = this.days;
    // // @ts-ignore
    // document.getElementById('hours').innerText = this.hours;
    // // @ts-ignore
    // document.getElementById('mins').innerText = this.minutes;
    // // @ts-ignore
    // document.getElementById('seconds').innerText = this.seconds;

    // setInterval(this.myTimer, 1000);
  }

  monthlySubmit(id: number) {
    this.userAnswerService.submitAnswer(this.Monthlyanswer, id, 2).subscribe( responseData => {
      console.log('Success!', responseData)
      this.submitMsg = 'Success!'
    },
        (error : string)=>{
          this.submitMsg = 'Answer already submitted';
        });
        
    
  }
  weeklySubmit(id: number) {
    this.userAnswerService.submitAnswer(this.weeklyAnswer, id, 1).subscribe( responseData => {
      console.log('Success!', responseData)
      this.submitMsg = 'Success!'
    },
        (error : string)=>{
          this.submitMsg = 'Answer already submitted';
        });
    
  }
  dailySubmit(id: number) {
    var answer = this.myForm.get('rightAlternative')?.value;
    console.log(answer);
  
    this.userAnswerService.submitAnswer(answer, id, 0).subscribe( responseData => {
      console.log('Success!', responseData)
      this.submitMsg = 'Success!'
    },
        (error : string)=>{
          this.submitMsg = 'Answer already submitted';
        });
        
  }
}