import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent implements OnInit {
  regForm = {
    oldPassword: null,
    password: null,
  };
  user: any;
  constructor(
    private activeModal: NgbActiveModal,
    private service: AuthService,
    private storage: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
  }

  submit(form) {
    if (form.valid) {
      this.service.editPassword(this.user._id, this.regForm).subscribe(
        (res) => {
          if (res['status']) {
            Swal.fire({
              title: 'success',
              text: 'تم التعديل بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            form.reset();
            form.submitted = false;
          }
        },
        (err) => {
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
