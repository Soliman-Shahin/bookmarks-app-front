import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  async login(email: string, password: string): Promise<any> {
    const url = `${environment.apiUrl}/user/login`;
    const body = {
      email: email,
      password: password,
    };
    try {
      const res = await this.http
        .post(url, body, { observe: 'response' })
        .toPromise();
      this.setSession(res);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async signup(email: string, password: string): Promise<any> {
    const url = `${environment.apiUrl}/user/signup`;
    const body = {
      email: email,
      password: password,
    };
    try {
      const res = await this.http
        .post(url, body, {
          observe: 'response',
        })
        .toPromise();
      this.setSession(res);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  logout() {
    this.tokenService.removeTokens();
    this.router.navigate(['/auth/login']);
  }

  getNewAccessToken() {
    return this.http
      .get(`${environment.apiUrl}/user/access-token`, {
        headers: new HttpHeaders({
          'refresh-token': this.tokenService.getRefreshToken(),
          _id: this.tokenService.getUserId(),
        }),
        observe: 'response',
      })
      .pipe(
        tap((res: any) => {
          this.tokenService.setAccessToken(res.headers.get('access-token'));
        })
      );
  }

  // a private method to set the session
  private setSession(res: any) {
    this.tokenService.setSession(
      res.body._id,
      res.headers.get('access-token'),
      res.headers.get('refresh-token')
    );
  }
}
