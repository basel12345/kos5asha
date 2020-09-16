import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  hostUrl: string;
  constructor() {
    this.hostUrl = 'http://myrattle.com:3000';
  } 
}
