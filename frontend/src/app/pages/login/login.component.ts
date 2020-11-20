import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  formData: { username: String; password: String };
  error: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.formData = { username: '', password: '' };
  }

  validateForm() {
    return (
      !this.usernameFormControl.invalid && !this.passwordFormControl.invalid
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loginService.login(this.formData);
      console.log(this.loginService.isLoggedIn);
      this.loginService.isLoggedIn.subscribe((loggedIn) => {
        this.error = !loggedIn;
      });
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((loggedIn) => {
      loggedIn && this.router.navigateByUrl('/');
    });
  }
}
