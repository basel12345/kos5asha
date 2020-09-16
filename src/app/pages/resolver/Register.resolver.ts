import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProfileService } from '../Service/profile.service';

@Injectable({
    providedIn: 'root'
    })
    export class RegisterResolver implements Resolve<any> {
      constructor(private service: ProfileService) { }
      resolve(route:ActivatedRouteSnapshot) {
        let id = route.params.id
        return this.service.getAllRegister(id)
      }
    }