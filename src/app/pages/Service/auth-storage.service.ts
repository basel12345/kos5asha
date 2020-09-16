import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

enum StorageEnum {
  Token = 'Token',
  CurrentUser = 'CurrentUser',
}

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  constructor(private http: HttpClient) {}

  private setSessionStorage(key, obj) {
    sessionStorage.setItem(key, JSON.stringify(obj));
  }

  private getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  private removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  }

  SetToken(token: any) {
    this.setSessionStorage(StorageEnum.Token, token);
  }

  GetToken(): any {
    return this.getSessionStorage(StorageEnum.Token);
  }

  RemoveToken(): any {
    return this.removeSessionStorage(StorageEnum.Token);
  }

  SetCurrentUser(currentUser: any) {
    this.setSessionStorage(StorageEnum.CurrentUser, currentUser);
  }

  GetCurrentUser() {
    return this.getSessionStorage(StorageEnum.CurrentUser);
  }

  RemoveCurrentUser(): any {
    return this.removeSessionStorage(StorageEnum.CurrentUser);
  }
}
