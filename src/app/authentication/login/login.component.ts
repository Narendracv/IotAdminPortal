import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthenicationService,
  AuthResponseData,
} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenicationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    console.log('inside onLogin');
    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(email, password);
    authObs.subscribe(
      (resData) => {
        // this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        // this.error = errorMessage;
        // this.showErrorAlert(errorMessage);
        // this.isLoading = false;
      }
    );

    form.reset();
  }
}
