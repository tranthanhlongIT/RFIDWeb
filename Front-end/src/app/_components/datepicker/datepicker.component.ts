import { Component, Injectable, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (typeof (value) == 'string') {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    if (typeof (value) == 'object') return value
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string | Date): NgbDateStruct | null {
    if (value) {
      if (typeof (value) == 'string') {
        const date = value.split(this.DELIMITER);
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10)
        };
      }
      if (value instanceof Date) {
        return {
          day: value.getDate(),
          month: value.getMonth() + 1,
          year: value.getFullYear()
        }
      }
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

const WEEKDAYS_SHORT = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

@Injectable()
export class NgbDatepickerI18nVietNam extends NgbDatepickerI18n {
  getWeekdayShortName(weekday: number): string { { return WEEKDAYS_SHORT[weekday - 1]; } }
  getWeekdayLabel(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
  getMonthShortName(month: number) { return MONTHS[month - 1]; }
  getMonthFullName(month: number) { return MONTHS[month - 1]; }
  getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nVietNam },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class DatepickerComponent implements OnInit {
  _date: NgbDateStruct;
  _isValid: boolean = false;
  _isTouched: boolean = false;

  @Input() set date(value: string) {
    let parser = new CustomDateParserFormatter();
    this._date = parser.parse(new Date(value));
  }
  @Input() minDate?: NgbDateStruct;
  @Input() maxDate?: NgbDateStruct;
  @Input() isDisabled?: boolean = false;
  @Input() needValidation?: boolean = false;
  @Input() isRequired?: boolean = false;
  @Output() dateChange = new EventEmitter();
  constructor(private ngbCalendar: NgbCalendar) {
  }

  ngOnInit(): void {
  }

  change(value: NgbDate) {
    this._isTouched = true;
    if (this.ngbCalendar.isValid(value)) {
      this._isValid = true;
      this.dateChange.emit(this.toDate(value));
    }
    else {
      this._isValid = false;
      this.dateChange.emit();
    }
    if (!this.isRequired) this._isValid = true;
  }

  toDate(value: NgbDate) {
    return new Date(value.year, value.month - 1, value.day).toLocaleDateString('en-US');
  }
}