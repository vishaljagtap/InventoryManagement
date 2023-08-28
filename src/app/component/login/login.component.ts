import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  responseMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private core: CoreService
  ) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.api.login(loginInfo).subscribe({
      next: (res: any) => {
        if (res.toString() === 'Invalid'){
          this.responseMsg = 'Invalid Credentials!';
          this.core.openSnackBar('Invalid Credentials!');
        }
        else {
          this.responseMsg = '';
          this.api.saveToken(res.toString());
          let isActive = this.api.getTokenUserInfo()?.active ?? false;
          if (isActive) this.router.navigateByUrl('/inventory/dashboard');
          else {
            this.responseMsg = 'You are not Active!';
            this.core.openSnackBar('You are not Active!');
            this.api.deleteToken();
          }
        }
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
      },
    });
  }

  getEmailErrors() {
    if (this.Email.hasError('required')){
      //this.core.openSnackBar('Email is required!');
      return 'Email is required!';
    }
    if (this.Email.hasError('email')){ 
      //this.core.openSnackBar('Email is invalid.');
      return 'Email is invalid.';
    }
    return '';
  }

  getPasswordErrors() {
    if (this.Password.hasError('required')) return 'Password is required!';
    if (this.Password.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.Password.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}