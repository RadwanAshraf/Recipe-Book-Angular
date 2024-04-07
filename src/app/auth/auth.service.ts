import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists.';
              break;
            // Handle other error cases if needed
            default:
              errorMessage = 'An error occurred. Please try again later.';
          }
          return throwError(() => new Error(errorMessage)); // Return an Observable that emits the error message
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResposeDate>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByiBZFj170YECGJD7jgySGqvhYG5xTIdg',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
