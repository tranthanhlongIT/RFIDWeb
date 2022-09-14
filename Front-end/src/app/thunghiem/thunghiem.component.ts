import { Component, OnInit, ElementRef, ViewChild, Injectable } from '@angular/core';
import { ToastService } from '@app/_services/toast.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../_services/auth.service';
import { nhanvien } from '@app/_interfaces/nhanvien';
import { FormModalDeleteComponent } from '../_components/form-modal-delete/form-modal-delete.component';

type SortOrder = 'asc' | 'desc';
const rotate: { [key: string]: SortOrder } = { 'asc': 'desc', 'desc': 'asc' };

@Component({
  selector: 'app-thunghiem',
  templateUrl: './thunghiem.component.html',
  styleUrls: ['./thunghiem.component.css']
})
export class ThunghiemComponent implements OnInit {

  @ViewChild('formModal') _formModal: ElementRef;
  @ViewChild('formModalView') _formModalView: ElementRef;

  objName = "nhân viên";
  imageView = "";
  statusView = "";

  dsObj: nhanvien[] = [];
  obj: nhanvien = {} as nhanvien;
  searchObj: nhanvien = {} as nhanvien;

  formModal: NgbModalRef;
  formModalView: NgbModalRef;
  confirmModal: NgbModalRef;

  action: string = 'add';
  modalHeadings: {} = {
    'add': `Thêm mới ${this.objName}`,
    'upd': `Cập nhật thông tin ${this.objName}`,
    'det': `Thông tin chi tiết ${this.objName}`
  };

  sortOrder: SortOrder = 'asc';
  sortField: string = 'name';
  columns = [
    {
      name: 'name', text: 'Tên nhân viên', class: 'd-table-cell text-center', isSearchField: true, style: 'width: 30%'
    },
    {
      name: 'gender', text: 'Giới tính', class: 'd-none d-md-table-cell text-center',
    },
    {
      name: 'city', text: 'Thành phố', class: 'd-none d-xl-table-cell text-center',
    },
    {
      name: 'phone', text: 'Số điện thoại', class: 'd-none d-xl-table-cell text-center',
    },
    {
      name: 'status', text: 'Trạng thái', class: 'd-sm-table-cell text-center',
    },
  ];
  apiurl = 'api/employees/';

  btnSource = {
    option: 1,
    btns: [],
    isSearch: true,
  };

  constructor(
    private toastService: ToastService,
    private modalService: NgbModal,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.createNewObj();
  }

  createNewObj(): void {
    this.obj = {} as nhanvien;
  }

  showToast(message: string, background: string): void {
    this.toastService.show(message, {
      classname: `bg-${background} text-light`,
      delay: 3000,
      autohide: true,
      headertext: 'Thông báo'
    });
  }

  setFormAction(action: string, detailObj?) {
    this.action = action;
    let tempObj = { ...this.obj };

    if (this.action == 'add') {
      this.createNewObj();
      this.formModal = this.modalService.open(this._formModal, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static', keyboard: false });
      this.formModal.result.then(() => {
        this.createNewObj();
      }, () => this.obj = tempObj)
    }
    else if (this.action == 'upd') {
      if (Object.keys(this.obj).length == 0) {
        this.showToast(`Chưa có ${this.objName} nào được chọn!`, "warning");
        return;
      }
      this.formModal = this.modalService.open(this._formModal, { ariaLabelledBy: 'modal-basic-title', size: 'md', backdrop: 'static', keyboard: false });
      this.formModal.result.then(() => {
        this.update();
        this.createNewObj();
      }, () => { Object.assign(this.obj, tempObj) })
    }
    else if (this.action == 'det') {
      if (!detailObj) {
        this.showToast(`Chưa có ${this.objName} nào được chọn!`, "warning");
        return;
      }
      this.obj = detailObj;
      this.formModalView = this.modalService.open(this._formModalView, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static', keyboard: false });
      this.imageView = this.obj.imageURL;
      if(this.obj.status == 'X')
      {
        this.statusView = "Absent";
      }
      else{
        this.statusView = "Present";
      }
    } else if (this.action == 'del') {
      this.openConfirmModal();
    }
    else this.showToast(`Chưa có ${this.objName} nào được chọn!`, "warning");
  }

  openConfirmModal() {
    if (this.dsObj.filter(obj => obj.IsSelected).length > 0) {
      this.confirmModal = this.modalService.open(FormModalDeleteComponent, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
      this.confirmModal.componentInstance.dsObj = this.dsObj.filter(obj => obj.IsSelected);
      this.confirmModal.componentInstance.objName = this.objName;
      this.confirmModal.result.then(() => { this.delete(); this.createNewObj() }, () => 1);
    } else this.showToast(`Chưa có ${this.objName} nào được chọn!`, "warning");
  }

  sort(): void {
    this.dsObj.sort((x, y) => {
      if (!x[this.sortField] && !y[this.sortField]) return 0;
      if (!x[this.sortField]) return -1;
      if (!y[this.sortField]) return 1;

      if (this.sortOrder == 'asc') return (x[this.sortField] as string).localeCompare(y[this.sortField]);
      else if (this.sortOrder == 'desc') return -(x[this.sortField] as string).localeCompare(y[this.sortField]);
    })
  }

  changeSort(field: string): void {
    this.sortOrder = rotate[this.sortOrder];
    this.sortField = field;
    this.sort();
  }

  getAll(): void {
    this.dsObj = [];
    let resp = this.authService.getdata(this.apiurl + "getall");
    resp.subscribe(value => {
      if (value) {
        this.dsObj = value.employees;
        this.sort();
        (document.getElementById("all-checkbox") as HTMLInputElement).checked = false;
      }
    }, (ex) => {
      this.showToast(ex.error.Message, "danger");
    });
  }

  validate(): boolean {
    if (this.obj.name == null) {
      this.showToast('Lỗi: Tên nhân viên không bỏ trống', "danger");
      return true;
    }
  }

  add(): void {
    if (this.validate()) {
      return;
    }

    let resp = this.authService.postdata(this.obj, this.apiurl + "create");
    resp.subscribe(value => {
      if (value) {
        this.showToast("Ghi nhận dữ liệu thành công!", "success");
        this.formModal.close();
        this.getAll();
      }
    }, (ex) => {
      this.showToast(ex.error.Message, "danger");
    });
  }

  update(): void {
    if (this.validate()) {
      return;
    }

    let resp = this.authService.putdata(this.obj, this.apiurl + "update/" + this.obj.id);
    resp.subscribe(value => {
      if (value) {
        this.showToast("Ghi nhận dữ liệu thành công!", "success");
        this.formModal.close();
        this.getAll();
      }
    }, (ex) => {
      this.showToast(ex.error.Message, "danger");
    });
  }

  delete(): void {

    this.dsObj.filter(obj => obj.IsSelected)
    let resp = this.authService.deletedata(this.apiurl + "delete/" + this.obj.id);
    resp.subscribe(value => {
      this.createNewObj();
      this.getAll();
    }, (ex) => {
      this.showToast(ex.error.Message, "danger");
    });
  }

  search(): void {

    this.dsObj = [];
    let resp: any;
    if (this.searchObj.name != '')
      resp = this.authService.getdata(this.apiurl + "search/" + this.searchObj.name);
    else resp = this.authService.getdata(this.apiurl + "getall");
    
    resp.subscribe(value => {
      if (value) {
        this.dsObj = value.employees;
        this.sort();
        (document.getElementById("all-checkbox") as HTMLInputElement).checked = false;
      }
    }, (ex: any) => {
      this.showToast(ex.error.Message, "danger");
    });
  }

  selectRow(row: HTMLElement, obj): void {
    this.obj = { ...obj };

    let selectedRow = document.getElementsByClassName("selected");
    if (selectedRow.length > 0) selectedRow[0].className = "";
    row.className = "selected"
  }

  checkAll(value: boolean): void {
    this.dsObj.forEach((obj) => obj.IsSelected = value);
  }

  toggleHeaderCheckbox(): void {
    let headerCheckbox = document.getElementById("all-checkbox") as HTMLInputElement;
    if (this.dsObj.filter(obj => obj.IsSelected).length == this.dsObj.length) {
      headerCheckbox.checked = true;
    } else headerCheckbox.checked = false;
  }

}
