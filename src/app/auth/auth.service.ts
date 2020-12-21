import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  result: any;
  errmessage: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {

  }

  async login(email: string, password: string) {
    this.result = await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (res) => {
          console.log(res);
          this.result = res;
          this.router.navigate(['/dashboard']);
          localStorage.setItem('userId', this.result.user.uid);
          localStorage.setItem('refreshToken', this.result.user.refreshToken);
          this._snackBar.open('Login Success', 'Close', {
            duration: 2000,
          });
          
        },
        (err) => {
          console.log(err);
          this.errmessage = err.message;
          this._snackBar.open(this.errmessage, 'Close', {
            duration: 2000,
          });
          this.handleError(err);
        }
      );
  }
  async register(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        console.log(res);
        this.result = res;
        localStorage.setItem('userId', this.result.user.uid);
        localStorage.setItem('refreshToken', this.result.user.refreshToken);
        this.sendEmailVerification();
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.errmessage = err.message;
        this._snackBar.open(this.errmessage, 'Close', {
          duration: 2000,
        });
        this.handleError(err);
      }
    );
    // this.result.
    // console.log(this.result);
  }
  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification();
    // this.router.navigate(['admin/verify-email']);
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  // async  loginWithGoogle(){
  //   await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  //   this.router.navigate(['admin/list']);
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
