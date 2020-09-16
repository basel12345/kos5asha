import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { EditPasswordComponent } from './../edit-password/edit-password.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { EditInfoComponent } from '../edit-info/edit-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private modal: NgbModal, private storage: AuthStorageService) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
  }

  editPassword() {
    this.modal.dismissAll();
    this.modal.open(EditPasswordComponent, { size: 'md' });
  }

  editInfo() {
    this.modal.dismissAll();
    this.modal.open(EditInfoComponent, { size: 'md' });
  }

  dismiss() {
    this.modal.dismissAll();
  }
}
