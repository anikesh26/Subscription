import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  loginInvalid: boolean;

  constructor(private fb: FormBuilder, public authservice: AuthService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.LoginForm =this.fb.group({
      username: ['anikesh@test.com', Validators.email],
      password: ['anikesh', Validators.required]
    })

    
  }
  openSnackBar(message: string, action: string) {

  }

}
