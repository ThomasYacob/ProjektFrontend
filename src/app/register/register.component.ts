import { Component, OnInit} from '@angular/core';
import { User } from './user';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Validation from "../utils/validation";
import { Router } from '@angular/router'
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  })
    errorMsg = '';
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
          '',
          [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20)
          ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
          '',
          [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(40)
          ]
      ],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
        },
        {
          validators: [Validation.match('password', 'confirmPassword')]
        }
    )
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.userService.registerUser(this.form.value)
        .subscribe(
            response => {
                console.log('Success!', response)
                this.router.navigate(['/login']);
            },
            error => this.errorMsg = error.statusText
        )
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  get f(): { [key: string]: AbstractControl} {
    return this.form.controls;
  }

}