import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MainService } from '../../Service/main.service';
import Swal from 'sweetalert2';
import { AuthStorageService } from '../../Service/auth-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../Service/profile.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

export interface Certifactions {
  name: '';
}

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.scss'],
})
export class EditRecruitmentComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  certifactions: Certifactions[] = [];
  cvFile: any;
  CertificateFile: any;
  recruitment = {
    CV: File,
    Certificate: File,
  };
  educationalQualifications:Array<Object> = [
    {name:"بكالوريوس"},
    {name:"ماجستير"},
    {name:"دكتوراه"},
  ]
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() id: any
  registerForm: FormGroup;
  submitted = false;
  CV: any;
  Certificate: any;
  constructor(
    private modal: NgbModal,
    private Service: MainService,
    private storage: AuthStorageService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: ["", Validators.required],
      educationalQualification: ["", Validators.required],
      qualification: ["", Validators.required],
      yearsOfExperience: ["", Validators.required],
      courses: new FormArray([]),
    });
    this.profileService.getOneRegister(this.id).subscribe(res => {
      this.CV = res["cv"];
      this.Certificate = res["certificate"];
      res["courses"].forEach(element => {
        this.courses.push(new FormControl('' || element, Validators.required));
      });
      this.registerForm.patchValue(res);
    });
  }

  get f() { return this.registerForm.controls; }

  get courses(): FormArray {
    return this.registerForm.get('courses') as FormArray;
  }

  dismiss() {
    this.modal.dismissAll();
  }

  addCourseField() {
    if (this.courses.length <= 2) {
        this.courses.push(new FormControl('', Validators.required));
    }
  }


  deleteNameField(index: number) {
    if (this.courses.length !== 1) {
        this.courses.removeAt(index);
    }
  }


  uploadCv(e) {
    this.CV = e[0].name;
    this.recruitment.CV = e[0];
  }

  uploadCertificate(e) {
    this.Certificate = e[0].name;
    this.recruitment.Certificate = e[0];
  }

  add() {
    this.certifactions.push({ name: '' });
  }


  submit() {
    if (this.storage.GetCurrentUser()) {
      // if (this.registerForm.invalid) {
        this.Service.editRecruitment(
          this.id,
          this.registerForm.value.name,
          this.registerForm.value.email,
          this.registerForm.value.dateOfBirth,
          this.registerForm.value.educationalQualification,
          this.registerForm.value.qualification,
          this.registerForm.value.yearsOfExperience,
          this.registerForm.value.courses,
          this.recruitment.CV,
          this.recruitment.Certificate,
          ).subscribe((res) => {
            if (res['status']) {
            this.submitted = false;
            Swal.fire({
              title: 'success',
              text: 'تم التعديل بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.passEntry.emit(res);
            this.modal.dismissAll();
          } else {
            Swal.fire({
              title: 'Error',
              text: res['message'],
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      // }
    } else {
      this.submitted = false;
      alert('يجب عليك تسجيل الدخول!');
    }
  }
}
