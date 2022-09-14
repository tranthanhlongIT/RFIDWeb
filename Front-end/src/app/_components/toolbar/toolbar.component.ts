import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  _btns: [];

  @Input() dataSource: {
    option: number,
    btns: [],
    isSearch: boolean
  }

  @Input()
  set btnDisable(value: string[]) {
    if (value && this._btns) {
      this._btns.forEach((gr: any) => {
        if (gr) {
          gr.forEach(btn => {
            if (value.includes(btn.action))
              btn.isDisabled = true;
          })
        }
      })
    }
  }

  @Output() btnClick = new EventEmitter();

  dfBtns: any = [
    [
      { action: 'add', title: 'Thêm mới', classBtn: 'btn-success', classIcon: 'fas fa-plus' },
      { action: 'upd', title: 'Sửa', classBtn: 'btn-warning', classIcon: 'fas fa-edit' },
      { action: 'del', title: 'Xóa', classBtn: 'btn-danger', classIcon: 'fas fa-backspace' }
    ] 
  ];

  dfBtns2: any = [
    [
      { action: 'add', title: 'Thêm mới', classBtn: 'btn-success', classIcon: 'fas fa-plus' },
      { action: 'upd', title: 'Sửa', classBtn: 'btn-warning', classIcon: 'fas fa-edit' },
      { action: 'del', title: 'Xóa', classBtn: 'btn-danger', classIcon: 'fas fa-backspace' }
    ],
    [
      { action: 'exp', title: 'Xuất excel', classBtn: 'btn-info', classIcon: 'fas fa-file-export' }
    ],
  ];
  constructor() { }

  ngOnInit(): void {
    if (this.dataSource.option == 0) {
      this._btns = this.dataSource.btns;
    }
    else if (this.dataSource.option == 1) {
      this._btns = this.dfBtns;
      if (this.dataSource.btns) {
        this._btns = [...this._btns, ...this.dataSource.btns];
      }
    }
    else if (this.dataSource.option == 2) {
      this._btns = this.dfBtns2;
      if (this.dataSource.btns) {
        this._btns = [...this._btns, ...this.dataSource.btns];
      }
    }
  }

  click(action: string): void {
    this.btnClick.emit(action);
  }
}