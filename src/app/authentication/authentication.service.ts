import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, pipe, tap, throwError } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { AppUser } from './app-user.model';
import { environment } from 'src/environments/environment';
export interface AuthResponseData {
  username: string;
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({ providedIn: 'root' })
export class AuthenicationService {
  user = new BehaviorSubject<AppUser | null>(null);
  private tokenExpirationTimer: any;

  private apiURL = `${environment.apihosturl}/API/Authentication/`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    let model =
      'username=' +
      username +
      '&password=' +
      password +
      '&grant_type=' +
      'password';
    model = `{"username":"${username}","password":"${password}"}`;
    return this.http
      .post<AuthResponseData>(`${this.apiURL}Token`, model, {
        headers: {
          'access-control-allow-origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.hanldleAuthentication(
            username,
            respData.access_token,
            respData.token_type,
            +respData.expires_in
          );
        })
      );
  }

  private hanldleAuthentication(
    username: string,
    token: string,
    tokenType: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //Set user object to user Observable
    this.user.next(new AppUser(username, token, tokenType, expirationDate));

    localStorage.setItem('userData', JSON.stringify(this.user.value));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getTokenInfo() {
    const storageData = localStorage.getItem('userData') ?? '';

    if (!storageData) return;

    return JSON.parse(storageData) as AppUser;
  }
  autoLogin() {
    const storageData = localStorage.getItem('userData') ?? '';
    const userData = JSON.parse(storageData) as AppUser;

    if (!userData) {
      return;
    }

    const loadedUser = new AppUser(
      userData.username,
      userData.tokenType,
      userData.token,
      new Date(userData.expirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser); // update user context
      const expirationDuration =
        new Date(userData.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
