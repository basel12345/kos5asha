import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNurseryComponent } from './add-nursery.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: AddNurseryComponent,
  },
];

@NgModule({
  declarations: [AddNurseryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7y7wARmQCMp4f8LfCFFJm14WmmMcZzt8',
    }),
  ],
})
export class AddNurseryModule {}
