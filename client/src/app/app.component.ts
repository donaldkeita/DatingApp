import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error)
    })
  }
}
