import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { nextTick } from 'process';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}
  loggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  // Observable is lazy. It does not do anything until you subscribe
  // login() {
  //   this.accountService.login(this.model).subscribe(response => {
  //     console.log(response); // log : Prints to stdout with newline.
  //     this.loggedIn = true;
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (v) => { 
        console.log(v), 
        this.loggedIn = true
      },
      error: (e) => { console.error(e) }
    })
  }

  
  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }


  // !! - turns object into a boolean
  // e.g: !!user - if user is null, that means it is false; otherwise it is true
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (v) => this.loggedIn = !!v,
      error: (e) => console.error(e)
    })
   }

  // getCurrentUser() {
  //     this.accountService.currentUser$.subscribe({
  //       next: (v) => console.log(v),        // log : Prints to stdout with newline.  
  //       error: (e) => console.error(e)
  //     })
  //   }

}
