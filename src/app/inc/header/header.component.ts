import { ProfileComponent } from './../profile/profile.component';
import { RegisterComponent } from './../register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LoginComponent } from '../login/login.component';
import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '50%',
        })
      ),
      state(
        'out',
        style({
          width: '0',
        })
      ),
      state(
        'full',
        style({
          width: '100%',
        })
      ),
      transition('in <=> out', animate('400ms ease-in-out')),
      transition('full <=> in', animate('400ms ease-in-out')),
      transition('full <=> out', animate('400ms ease-in-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  menuState: string;
  user: any;
  id: any;
  constructor(private modal: NgbModal, private storage: AuthStorageService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
    if(this.user) {
      this.id = this.user._id;
    }
  }

  toggleMenu() {
    switch (this.menuState) {
      case 'full':
        this.menuState = 'in';
        break;
      case 'in':
        this.menuState = 'out';
        break;
      case 'out':
        this.menuState = 'in';
        break;
      default:
        this.menuState = 'in';
        break;
    }
  }

  menuItem() {
    window.innerWidth <= 767 ? (this.menuState = 'out') : '';
  }

  login() {
    this.modal.open(LoginComponent, { size: 'md' });
  }

  logOut(){
    this.storage.RemoveCurrentUser();
    this.storage.RemoveToken();
    location.reload();
  }

  register() {
    this.modal.open(RegisterComponent, { size: 'md' });
  }

  profile() {
    this.modal.open(ProfileComponent, { size: 'md' });
  }


  @HostListener('window:scroll', []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    window.innerWidth <= 767 && this.menuState === 'in'
      ? (this.menuState = 'out')
      : '';
  }
}
