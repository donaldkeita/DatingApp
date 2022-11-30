import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

// @Injectable - means this service can be injected into another component and/or another service
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  // ReplaySubject - a type of observable. A kind of buffer object that stores values 
  //private currentUserSource = new ReplaySubject<User>(1);
  private currentUserSource = new BehaviorSubject<User | null>(null);
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

  register(model : any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        //const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

}
