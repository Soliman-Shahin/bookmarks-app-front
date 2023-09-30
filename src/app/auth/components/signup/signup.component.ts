import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  hide: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signup(data: any): void {
    this.authService.signup(data.email, data.password).then((res) => {
      if (res?.status === 200) {
        this.router.navigate(['/auth/login']);
        this.openSnackBar('success', res?.ok, 'SignUp successfully');
      } else {
        this.openSnackBar('error', res?.ok, res?.error?.error);
      }
    });
  }

  openSnackBar(type: any, status: any, message: any) {
    this._snackBar.open(status, message, { panelClass: type });
  }
}
