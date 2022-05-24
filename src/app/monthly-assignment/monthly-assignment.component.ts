import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { MonthlyService } from '../_services/monthly.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-monthly-assignment',
  templateUrl: './monthly-assignment.component.html',
  styleUrls: ['./monthly-assignment.component.css']
})
export class MonthlyAssignmentComponent implements OnInit {
   myForm = new FormGroup({
    question: new FormControl(''),
    answer: new FormControl(''),
    hint1: new FormControl(''),
    hint2: new FormControl(''),
    hint3: new FormControl(''),
    date: new FormControl(''),
  })

  errorMsg = '';
  submitted = false;

  constructor(private formBuilder: FormBuilder, private monthlyService : MonthlyService, private router: Router) { }

 ngOnInit(): void {
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value)
    this.monthlyService.createMonthly(this.myForm.value)
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
