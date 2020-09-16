import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecruitmentComponent } from './add-recruitment.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddRecruitmentComponent,
  },
];

@NgModule({
  declarations: [AddRecruitmentComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class AddRecruitmentModule {}
