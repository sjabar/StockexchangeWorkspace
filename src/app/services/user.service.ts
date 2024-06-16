import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<UserToken>;
  public token: Observable<UserToken>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token')|| '{}'));
    this.token = this.tokenSubject.asObservable();
   }

  public get tokenValue(): UserToken {
    return this.tokenSubject.value;
  }

  login(email: string, password: string) {
    let expiresInMins:Number=30;
    return this.http.post<UserToken>(`https://dummyjson.com/auth/login`, JSON.stringify({email, password,expiresInMins}))
    .pipe(
      map(token => {
        let newtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcxNzYxMTc0MCwiZXhwIjoxNzE3NjE1MzQwfQ.eQnhQSnS4o0sXZWARh2HsWrEr6XfDT4ngh0ejiykfH8";
       
        const userToken: UserToken = token||newtoken;

        localStorage.setItem('user-token', JSON.stringify(userToken));
        this.tokenSubject.next(userToken);

        return userToken;
      })
    );
  }

  logout() {
    //let userToken: UserToken=null;
    localStorage.removeItem('user-token');
    let userToken: UserToken=new UserToken();
    this.tokenSubject.next(userToken);
    this.router.navigate(['/']);
  }
}
