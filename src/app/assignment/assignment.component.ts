import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  myForm = new FormGroup({
    question: new FormControl(''),
    answer: new FormControl(''),
    dateToBePublished: new FormControl(''),

  })
  constructor() {
  }
  
  ngOnInit() {
      
  }

  onSubmit(){
    console.log(this.myForm.value)
  }
}


