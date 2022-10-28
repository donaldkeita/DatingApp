import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

// @Injectable - means this service can be injected into another component and/or another service
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  // next - with this method, you can pass new values. All the current subscribers will receive this.
  // @return — An Observable of the response, with the response body as a JSON object.
  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  // setCurrentUser -  Helper function
  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }


  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
