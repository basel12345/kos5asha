import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/Service/auth.service';
import Swal from 'sweetalert2';
import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm = {
    username: null,
    email: null,
    address: null,
    mobile: null,
    telephone: null,
    password: null,
    confirmPassword: null,
    isRole: null,
  };
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    private activeModal: NgbActiveModal,
    private service: AuthService,
    private storage: AuthStorageService,
  ) {}

  ngOnInit(): void {}

  dismiss() {
    this.activeModal.dismiss();
  }

  submit(form) {
    if (form.valid && this.regForm.password === this.regForm.confirmPassword) {
      this.service.register(this.regForm).subscribe(
        (res) => {
          if (res['status']) {
            this.storage.SetToken(res['token']);
            this.storage.SetCurrentUser(res['user']);
            location.reload();
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
}
