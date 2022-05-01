import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PostService} from './post.service'




@Component({
  selector: 'app-weekly-assignment',
  templateUrl: './weekly-assignment.component.html',
  styleUrls: ['./weekly-assignment.component.css']
})
export class WeeklyAssignmentComponent implements OnInit {
 myForm = new FormGroup({
    question: new FormControl(''),
    answer: new FormControl(''),
    dateToBePublished: new FormControl(''),
  })
  errorMsg = '';
    submitted = false;



  constructor(private formBuilder: FormBuilder, private _postService: PostService) { }


 ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.myForm.invalid) {
      return;
    }
    this._postService.enroll(this.myForm.value)
        .subscribe(
            response => console.log('Success!', response),
            error => this.errorMsg = error.statusText
        )
    console.log(JSON.stringify(this.myForm.value, null, 2));
  }

    get f(): { [key: string]: AbstractControl} {
    return this.myForm.controls;
  }


}
