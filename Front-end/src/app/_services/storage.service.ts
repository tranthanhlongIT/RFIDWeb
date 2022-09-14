import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'

const TOKEN_KEY = btoa(environment.UrlHostName + 'auth-token');
const USER_KEY = btoa(environment.UrlHostName + 'auth-user');
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public saveItem(item_key: string, item_value: any): void {
    let encodeditem_key = btoa(environment.UrlHostName + item_key);
    window.sessionStorage.removeItem(encodeditem_key);
    window.sessionStorage.setItem(encodeditem_key, item_value);
  }
  public getItem(item_key: string): any {
    let encodeditem_key = btoa(environment.UrlHostName + item_key);
    return sessionStorage.getItem(encodeditem_key);
  }
  public removeItem(item_key: string): any {
    let encodeditem_key = btoa(environment.UrlHostName + item_key);
    window.sessionStorage.removeItem(encodeditem_key);
  }
}
