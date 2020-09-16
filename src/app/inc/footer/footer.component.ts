import { MainService } from './../../pages/Service/main.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  contact = {
    name: null,
    email: null,
    mobile: null,
    message: null,
  };
  constructor(private Service: MainService) {}

  ngOnInit(): void {}

  submit(form) {
    if (form.valid) {
      this.Service.addConnect(this.contact).subscribe((res) => {
        if (res['status']) {
          form.reset();
          form.submitted = false;
          Swal.fire({
            title: 'success',
            text: 'تم الارسال بنجاح',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }
      });
    }
  }
}
