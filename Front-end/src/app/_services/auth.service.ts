import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment'
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpOptionslogin = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient,
    private tokenStorageService: StorageService,
    private router: Router,
    private toastService: ToastService
  ) { }
  public login(credentials): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', credentials.username)
      .set('password', credentials.password);

    var obs = this.http.post(environment.URLAPI + 'Token', body,
      this.httpOptionslogin
    );
    return obs;
  }

  public postdata(data, apiname, httpOptions: any = this.httpOptions): Observable<any> {
    var obs = this.http.post(environment.URLAPI + apiname, data, httpOptions);
    return obs;
  }

  public putdata(data, apiname, httpOptions: any = this.httpOptions): Observable<any> {
    var obs = this.http.put(environment.URLAPI + apiname, data, httpOptions);
    return obs;
  }

  public deletedata(apiname, httpOptions: any = this.httpOptions): Observable<any> {
    var obs = this.http.delete(environment.URLAPI + apiname, httpOptions);
    return obs;
  }

  public getdata(apiname): Observable<any> {
    var obs = this.http.get(environment.URLAPI + apiname);
    return obs;
  }

  public redirect(url: string, par: any = {}) {
    this.router.navigate([url, par]);
  }
  public showToast(message: string, background: string = 'danger', headertext: string = 'Thông báo'): void {
    this.toastService.show(message, {
      classname: `bg-${background} text-light`,
      delay: 5000,
      autohide: true,
      headertext: headertext
    });
  }

}
