// import { RegisterComponent } from './../register/register.component';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/pages/Service/auth.service';
import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { RegisterComponent } from '../register/register.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = {
    email: null,
    password: null,
  };
  constructor(
    private activeModal: NgbActiveModal,
    private service: AuthService,
    private storage: AuthStorageService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {}

  dismiss() {
    this.activeModal.dismiss();
  }

  submit(form) {
    if (form.valid) {
      this.service.login(this.loginForm).subscribe(
        (res) => {
          this.storage.SetToken(res['token']);
          this.storage.SetCurrentUser(res['user']);
          location.reload();
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

  register() {
    this.activeModal.dismiss();
    this.modal.open(RegisterComponent);
  }
}
