import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';


// decorator: defines what kind of angular class is it in the angular framework
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  // class properties
  title = 'The Dating App';           
  users: any                          // any - a data type, could be string, int, array, ..

  // constructor
  constructor(private accountService:AccountService) {
  }
  
  ngOnInit(): void {
    // this.getUsers();
    this.setCurrentUser();
  }

  // we get the the user object from the local storage, then set it to our accountService
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  // // getUsers - display the list of all users
  // getUsers() {
  //   this.http.get('https://localhost:5001/api/users').subscribe({
  //     next: response => this.users = response,
  //     error: error => console.log(error)
  //   })
  // }
}
