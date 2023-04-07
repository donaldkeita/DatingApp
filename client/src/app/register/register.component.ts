import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  registerForm : FormGroup;
  

  constructor(private accountService : AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username : new FormControl('', Validators.required),
      password : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword : new FormControl('', [Validators.required, this.matchValues('password')]),
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next : () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo : string) : ValidatorFn {
    return (control : AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching : true}
    }
  }

  register() {
    console.log(this.registerForm?.value);
    // this.accountService.register(this.model).subscribe({
    //   next: (v) => { 
    //     console.log(v);
    //     this.cancel();        // close the form after registered
    //   },
    //   // the http response message is contained in the error. But the error message is contained inside
    //   // the error property
    //   error: (e) => { console.error(e); 
    //                   this.toastr.error(e.error);}
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }

}
