import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'add-nursery',
    loadChildren: () =>
      import('../app/pages/add-nursery/add-nursery.module').then(
        (m) => m.AddNurseryModule
      ),
  },
  {
    path: 'add-recruitment',
    loadChildren: () =>
      import('../app/pages/add-recruitment/add-recruitment.module').then(
        (m) => m.AddRecruitmentModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../app/pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('../app/pages/about-us/about-us.module').then(
        (m) => m.AboutUsModule
      ),
  },
  {
    path: 'profile/:id',
    loadChildren: () =>
      import('../app/pages/profile/profile.module').then(
        (m) => m.ProfilesModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
