import { Injectable } from '@angular/core';
import { Config } from 'src/app/Config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private config: Config, private http: HttpClient) {}
  hostUrl = this.config.hostUrl;

  getAllNursery(userId) {
    const url = this.hostUrl + `/register/getRegistersByUser/${userId}`;
    return this.http.get(url);
  }

  getOneNursery(id) {
    const url = this.hostUrl + `/register/getSpecificRegisters/${id}`;
    return this.http.get(url);
  }

  getAllRegister(userId) {
    const url = this.hostUrl + `/employment/getEmployementById/${userId}`;
    return this.http.get(url);
  }

  getOneRegister(id) {
    const url = this.hostUrl + `/employment/getSpecificEmployement/${id}`;
    return this.http.get(url);
  }
}
