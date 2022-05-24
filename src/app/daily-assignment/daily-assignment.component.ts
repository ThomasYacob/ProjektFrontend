import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { DailyService } from '../_services/daily.service';


@Component({
  selector: 'app-daily-assignment',
  templateUrl: './daily-assignment.component.html',
  styleUrls: ['./daily-assignment.component.css']
})
export class DailyAssignmentComponent implements OnInit {


  myForm = new FormGroup({
    question: new FormControl(''),
    alternative1: new FormControl(''),
    alternative2: new FormControl(''),
    alternative3: new FormControl(''),
    date: new FormControl(''),
    rightAlternative: new FormControl(''),
  })

  errorMsg = '';
  submitted = false;

  alternative1 = '1'
  alternative2 = '2'
  alternative3 = '3'
  selectedValue: string | undefined

  constructor(private formBuilder: FormBuilder, private dailyService : DailyService, private router: Router) { }

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


