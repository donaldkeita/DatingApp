import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() maxDate : Date
  bsConfig : Partial<BsDatepickerConfig>;


  constructor(@Self() public ngControl : NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass : 'theme-red',
      dateInputFormat : 'DD MMMM YYYY'
    }
   }


  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

}
