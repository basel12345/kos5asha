import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthStorageService } from '../Service/auth-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('content') myModal;
  user: any;

  constructor(private modal: NgbModal, private storage: AuthStorageService) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
  }

  openModal() {
    this.modal.open(this.myModal, { size: 'lg' });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
