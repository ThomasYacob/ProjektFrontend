import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Daily } from '../daily-assignment/daily';
import { Monthly } from '../monthly-assignment/monthly';
import { Weekly } from '../weekly-assignment/weekly';
import { DailyService } from '../_services/daily.service';
import { MonthlyService } from '../_services/monthly.service';
import { WeeklyService } from '../_services/weekly.service';

@Component({
  selector: 'app-assignment-moderator',
  templateUrl: './assignment-moderator.component.html',
  styleUrls: ['./assignment-moderator.component.css']
})
export class AssignmentModeratorComponent implements OnInit {

  constructor(private weeklyService : WeeklyService, private monthlyService: MonthlyService , private dailyService : DailyService) { }


  monthly?: Monthly[];
  daily?: Daily[];
  weekly?: Weekly[];
  deleteMsg:string = "";


  ngOnInit(): void {
    this.dailyService.getAllDaily().subscribe(data =>{
      console.log(data + 'daily')
      this.daily = data;
      })
    this.weeklyService.getAllWeekly().subscribe(data =>{
      console.log(data + 'weekly')
      this.weekly = data;
    })
    this.monthlyService.getAllMonthly().subscribe(data =>{
      console.log(data + 'monthly')
      this.monthly = this.monthly;
    })    
  }


  onClickDelete(id: number,type : number) {
    switch (type) {
      case 1:this.monthlyService.deleteMonthly(id)
            .subscribe(responseData => {
                this.deleteMsg = 'Successfully deleted';
            }, (error: string) => {
                this.deleteMsg = error;
            });
        break;
       case 2:this.dailyService.deleteDaily(id)
            .subscribe(responseData => {
                this.deleteMsg = 'Successfully deleted';
            }, (error: string) => {
                this.deleteMsg = error;
            });
        break;
        case 3:this.weeklyService.deleteWeekly(id)
            .subscribe(responseData => {
                this.deleteMsg = 'Successfully deleted';
            }, (error: string) => {
                this.deleteMsg = error;
            });
        break;

    }
        
    }

}
