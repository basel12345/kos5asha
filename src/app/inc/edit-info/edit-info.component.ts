import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss'],
})
export class EditInfoComponent implements OnInit {
  regForm = {
    username: null,
    email: null,
    address: null,
    mobile: null,
    telephone: null,
  };
  user: any;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    private activeModal: NgbActiveModal,
    private service: AuthService,
    private storage: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
    this.regForm.username = this.user["username"];
    this.regForm.email = this.user["email"];
    this.regForm.address = this.user["address"];
    this.regForm.mobile = this.user["mobile"];
    this.regForm.telephone = this.user["telephone"];
  }

  submit(form) {
    if (form.valid) {
      this.service.editInfo(this.user._id, this.regForm).subscribe(
        (res) => {
          if (res['status']) {
            Swal.fire({
              title: 'success',
              text: 'تم التعديل بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.storage.SetCurrentUser(res['user']);
            form.reset();
            form.submitted = false;
            this.activeModal.dismiss();
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
