import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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

  constructor(private loginService: LoginService) {
    this.formData = { username: '', password: '' };
  }

  validateForm() {
    return (
      !this.usernameFormControl.invalid && !this.passwordFormControl.invalid
    );
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loginService.login();
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
