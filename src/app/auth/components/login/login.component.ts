import { TokenService } from './../../services/token.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  hide: boolean = true;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login(data: any): void {
    this.authService.login(data.email, data.password).then((res) => {
      if (res?.status === 200) {
        this.tokenService.setUsername(res?.body?.email);
        this.tokenService.setUserLang(this.translate.instant('LANG'));
        this.router.navigate(['/bookmarks']);
        this.openSnackBar('success', res?.ok, 'Welcome back');
      } else {
        this.openSnackBar('error', res?.ok, res?.error?.error);
      }
    });
  }

  openSnackBar(type: any, status: any, message: any) {
    this._snackBar.open(status, message, { panelClass: type });
  }
}
