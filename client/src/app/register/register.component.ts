import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  

  constructor(private accountService : AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: (v) => { 
        console.log(v);
        this.cancel();        // close the form after registered
      },
      // the http response message is contained in the error. But the error message is contained inside
      // the error property
      error: (e) => { console.error(e); 
                      this.toastr.error(e.error);}
    })
    //console.log(this.model)
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }

}
