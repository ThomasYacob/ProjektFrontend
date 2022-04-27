import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-daily-assignment',
  templateUrl: './daily-assignment.component.html',
  styleUrls: ['./daily-assignment.component.css']
})
export class DailyAssignmentComponent implements OnInit {

  myForm = new FormGroup({
    question: new FormControl(''),
    answer: new FormControl(''),
    dateToBePublished: new FormControl(''),

  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.myForm.value)
  }
}


