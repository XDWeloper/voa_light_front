import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {AuthResponse} from "../interface";


@Injectable({providedIn: 'root'})

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(pin: number): Observable<any>{
    return this.http.get(`${environment.authUrl}?pin=${pin}`)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    switch (message){
      case 'INVALID_MAIL':
        this.error$.next('Не верный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Не верный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Нет такого email')
        break
    }
    return throwError(error)
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }


  private setToken(token: AuthResponse | null) {
    if (token) {
      const expDate = new Date(new Date().getTime() + +token.expiresIn * 1000)
      localStorage.setItem('fb-token', token.token)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
       localStorage.clear()
     }
  }
}
