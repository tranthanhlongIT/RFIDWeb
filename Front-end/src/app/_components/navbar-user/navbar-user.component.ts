import { StorageService } from '@app/_services/storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@app/_services/auth.service';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  newPassword: string = '';
  confirmPassword: string = '';
  currentPassword: string = '';

  @ViewChild('formModal') _formModal: ElementRef;
  formModalRef: NgbModalRef;

  currentTokenUser: any;
  avatarSrc: SafeUrl;

  constructor(
    private token: StorageService,
    private modalService: NgbModal,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.currentTokenUser = this.token.getUser();
    this.getAvatar();
  }

  logout(): void {
    this.token.signOut();
    this.authService.redirect('login');
  }

  openModal() {
    this.formModalRef = this.modalService.open(this._formModal, { ariaLabelledBy: 'modal-basic-title', size: 'sm', backdrop: 'static', keyboard: false });
    this.formModalRef.result.then(() => { }, () => { })
  }

  changePass(): void {
    if (this.validate()) {
      return;
    }
    let result = {
      pdata: {
        Password: this.newPassword
      },
      pkey: this.currentPassword
    };
    let resp = this.authService.postdata(result, "api/hethong/stbnhanvien/changepassword");
    resp.subscribe(value => {
      if (value == '1') {
        this.formModalRef.close();
        this.authService.showToast("Thay đổi mật khẩu thành công!", "success");
        this.authService.redirect('login');
      }
      else this.authService.showToast(value)
    }, (ex) => {
      this.authService.showToast(ex.error.Message);
    });
  }

  validate(): boolean {
    if (this.newPassword == '') {
      this.authService.showToast('Vui lòng điền mật khẩu mới');
      return true;
    }
    if (this.confirmPassword == '') {
      this.authService.showToast('Vui lòng điền xác nhận mật khẩu');
      return true;
    }
    if (this.confirmPassword != this.newPassword) {
      this.authService.showToast('Mật khẩu mới và xác nhận mật khẩu không giống');
      return true;
    }
    return false;
  }

  getAvatar(): any {
    if (this.currentTokenUser.linkhinhanh) {
      let result = { pkey: this.currentTokenUser.linkhinhanh }
      this.authService.postdata(result, "api/utils/file/getavatar", { responseType: 'blob' })
        .pipe(map(result => result))
        .subscribe(res => {
          this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res));
        }, ex => this.authService.showToast("File không hỗ trợ hiển thị!", "warning"));
    }
  }
}
