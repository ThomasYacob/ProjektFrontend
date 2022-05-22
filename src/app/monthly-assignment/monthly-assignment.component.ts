import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PostService} from './post.service'



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

  constructor(private formBuilder: FormBuilder, private _postService: PostService) { }

 ngOnInit(): void {
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value)
    this._postService.enroll(this.myForm.value)
        .subscribe(
            response => console.log('Success!', response),
            error => this.errorMsg = error.statusText
        )
      this.reloadPage();
      console.log(JSON.stringify(this.myForm.value, null, 2));
  }

    get f(): { [key: string]: AbstractControl} {
    return this.myForm.controls;
  }

    reloadPage(): void {
        window.location.replace('/assignment');
    }

}
