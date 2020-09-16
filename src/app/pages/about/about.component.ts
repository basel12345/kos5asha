import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @ViewChild('content') myModal;
  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    this.modal.open(this.myModal, { size: 'lg' });
  }
}
