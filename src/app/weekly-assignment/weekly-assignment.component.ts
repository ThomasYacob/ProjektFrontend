import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { DailyService } from '../_services/daily.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-weekly-assignment',
  templateUrl: './weekly-assignment.component.html',
  styleUrls: ['./weekly-assignment.component.css']
})
export class WeeklyAssignmentComponent implements OnInit {
 myForm = new FormGroup({
    question: new FormControl(''),
    answer: new FormControl(''),
    date: new FormControl(''),
  })
  errorMsg = '';
    submitted = false;

  constructor(private formBuilder: FormBuilder, private dailyService : DailyService, private router : Router) { }


 ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.myForm.invalid) {
      return;
    }
    this.dailyService.createDaily(this.myForm.value)
        .subscribe(
            Response =>{
              console.log('Success', Response)
              this.router.navigate(['/assignment']);
            },
            error => this.errorMsg = error.statusText
        )
      console.log(JSON.stringify(this.myForm.value, null, 2));
  
  }

    get f(): { [key: string]: AbstractControl} {
    return this.myForm.controls;
  }

}
