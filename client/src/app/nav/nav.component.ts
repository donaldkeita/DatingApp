import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { ToastrService } from 'ngx-toastr';
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

  // constructor
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {
   }

  ngOnInit(): void {   
    // this.currentUser$ = this.accountService.currentUser$;     //  this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (v) => { 
        this.router.navigateByUrl('/members');
      },
      // the http response message is contained in the error. But the error message is contained inside
      // the error property
      // error: (e) => { console.error(e); 
      //                 this.toastr.error(e.error)}
    })
  }

  
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
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
