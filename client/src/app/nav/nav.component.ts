import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

  model:any = {}
  // currentUser$: Observable<User>;   //loggedIn: boolean;

  // constructor
  constructor(public accountService: AccountService) {
   }

  ngOnInit(): void {   
    // this.currentUser$ = this.accountService.currentUser$;     //  this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (v) => { 
        console.log(v) 
      },
      error: (e) => { console.error(e) }
    })
  }

  
  logout() {
    this.accountService.logout();
    // this.loggedIn = false;
  }


  // !! - turns object into a boolean
  // e.g: !!user - if user is null, that means it is false; otherwise it is true
  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: (v) => this.loggedIn = !!v,
  //     error: (e) => console.error(e)
  //   })
  //  }

}
