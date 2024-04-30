import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResposeDate {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registerd?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  defaultUser!:User;
  user = new BehaviorSubject<User>(this.defaultUser);
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResposeDate>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByiBZFj170YECGJD7jgySGqvhYG5xTIdg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResposeDate>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByiBZFj170YECGJD7jgySGqvhYG5xTIdg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handelError),
        tap((resData) => {
          this.handelAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handelAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    console.log('User Loged:'+this.user.subscribe(),'>>>>userID:'+user.token);
  }
  private handelError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred. Please try again later!';
    // if (!errorRes.error || !errorRes.error.error) {
    // return throwError(() => new Error(errorMessage));
    //}
    console.log('ErrorMessage:' + errorRes.error.error.message);
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The user may have been deleted!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'This email or password in not correct.';
        break;
    }
    return throwError(() => errorMessage); // Return an Observable that emits the error message
  }
}
