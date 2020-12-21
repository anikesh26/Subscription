import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  loginInvalid: boolean;

  constructor(private fb: FormBuilder, public authservice: AuthService) { }

  ngOnInit(): void {
    this.RegisterForm =this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

}
