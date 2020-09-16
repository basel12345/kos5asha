import { Component, OnInit } from '@angular/core';
import { MainService } from '../Service/main.service';
import Swal from 'sweetalert2';
import { AuthStorageService } from '../Service/auth-storage.service';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';

export interface Certifactions {
  name: '';
}

@Component({
  selector: 'app-add-recruitment',
  templateUrl: './add-recruitment.component.html',
  styleUrls: ['./add-recruitment.component.scss'],
})
export class AddRecruitmentComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  certifactions: Certifactions[] = [];
  cvFile: any;
  CertificateFile: any;
  recruitment = {
    name: null,
    birth_date: null,
    qualification: null,
    experienceYears: null,
    email: null,
    courses: [],
    educationalQualification: null,
    CV: File,
    Certificate: File,
  };
  emptyRecruitment = {
    name: null,
    birth_date: null,
    qualification: null,
    experienceYears: null,
    email: null,
    courses: [],
    educationalQualification: null,
    CV: File,
    Certificate: File,
  };
  user: any;
  id: any;
  newDate: string;
  constructor(
    private Service: MainService,
    private storage: AuthStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
    if (this.user) {
      this.recruitment.name = this.user.username;
      this.recruitment.email = this.user.email;
    }
    if (this.user) {
      this.id = this.user._id;
    }
    this.certifactions.push({
      name: '',
    });
  }

  // checkDate() {
  //   this.newDate = new DatePipe('en-US').transform(this.recruitment.birth_date, 'dd/MM/yyyy')
  // }

  uploadCv(e) {
    this.recruitment.CV = e[0];
  }

  uploadCertificate(e) {
    this.recruitment.Certificate = e[0];
  }

  add() {
    this.certifactions.push({ name: '' });
  }

  delete(index) {
    this.certifactions.splice(index, 1);
  }

  pushValue(course) {
    this.recruitment.courses.push(course);
  }

  submit(form) {
    if (this.storage.GetCurrentUser()) {
      if (form.valid) {
        this.Service.addRecruitment(this.id, this.recruitment).subscribe((res) => {
          if (res['status']) {
            form.submitted = false;
            Object.assign(this.recruitment, this.emptyRecruitment);
            this.certifactions = [{ name: '' }];
            this.cvFile = '';
            this.CertificateFile = '';
            Swal.fire({
              title: 'success',
              text: 'تمت الاضافة بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: res['message'],
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    } else {
      form.submitted = false;
      alert('يجب عليك تسجيل الدخول !');
    }
  }
}
