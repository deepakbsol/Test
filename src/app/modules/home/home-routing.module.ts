import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
      children: [
        { path: 'userCompanyRegistration', loadChildren: () => import('./modules/user-company-registration/user-company-registration.module').then(m => m.UserCompanyRegistrationModule) },
        { path: 'file-format', loadChildren: () => import('./modules/file-format/file-format.module').then(m => m.FileFormatModule) }
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
