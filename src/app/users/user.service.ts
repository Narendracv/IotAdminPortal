import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class UserService {
  apiURL = `${environment.apihosturl}/API/Users/`;
  private users: User[] = [];
  usersChanged = new Subject<User[]>();
  constructor(private http: HttpClient) {}

  GetUsers() {
    return this.http
      .get<User[]>(`${this.apiURL}GetUsers`)
      .pipe(catchError(this.errorHandler));
  }
  SaveUser(user: User) {
    return this.http
      .post<User[]>(`${this.apiURL}SaveUser`, user)
      .pipe(catchError(this.errorHandler));
  }
  UpdateUser(user: User) {
    return this.http
      .put<User[]>(`${this.apiURL}UpdateUser`, user)
      .pipe(catchError(this.errorHandler));
  }

  GetUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiURL}getUserById?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteUser(id: number) {
    return this.http
      .delete(`${this.apiURL}DeleteUser?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
