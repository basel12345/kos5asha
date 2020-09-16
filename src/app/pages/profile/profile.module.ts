import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { NurseryResolver } from '../resolver/Nursery.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditNurseryComponent } from './edit-nursery/edit-nursery.component';
import { EditRecruitmentComponent } from './edit-register/edit-register.component';
import { RegisterResolver } from '../resolver/Register.resolver';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve:{
      Nursery: NurseryResolver,
      Register: RegisterResolver
    }
  },
];

@NgModule({
  declarations: [ProfileComponent,EditNurseryComponent,EditRecruitmentComponent],
  entryComponents:[EditNurseryComponent,EditRecruitmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyB7y7wARmQCMp4f8LfCFFJm14WmmMcZzt8',
  }),],
  providers:[
    NurseryResolver,
    RegisterResolver
  ]
})
export class ProfilesModule {}
