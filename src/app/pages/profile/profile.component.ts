import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { AuthStorageService } from '../Service/auth-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditNurseryComponent } from './edit-nursery/edit-nursery.component';
import { EditRecruitmentComponent } from './edit-register/edit-register.component';
import { ProfileService } from '../Service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit,DoCheck {
  user: any;
  Nursery: any;
  Register: any;
  constructor(private modal: NgbModal, private storage: AuthStorageService, private route: ActivatedRoute, private router:Router,  private Service: ProfileService
    ) {}

  ngOnInit(): void {
    this.user =this.storage.GetCurrentUser();
    this.route.data.subscribe(res => {
      this.Nursery = res.Nursery;
      this.Register = res.Register;
    })
  }

  ngDoCheck() {
    if(!this.user) {
      this.router.navigate(['../home'])
    }
  }

  nursery(id) {
    const modalRef = this.modal.open(EditNurseryComponent, { size: 'md' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.passEntry.subscribe((res) => {
      if(res) {
        this.Service.getAllNursery(this.user._id).subscribe(res => {
          this.Nursery = res;
        })
      }
    })
  }

  register(id) {
    const modalRef = this.modal.open(EditRecruitmentComponent, { size: 'md' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.passEntry.subscribe((res) => {
      if(res) {
        this.Service.getAllRegister(this.user._id).subscribe(res => {
          this.Register = res;
        })
      }
    })
  }

}
