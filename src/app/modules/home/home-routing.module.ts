import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent,
      children: [
        { path: 'userCompanyRegistration', loadChildren: () => import('./modules/user-company-registration/user-company-registration.module').then(m => m.UserCompanyRegistrationModule) },
        { path: 'file-format', loadChildren: () => import('./modules/file-format/file-format.module').then(m => m.FileFormatModule) },
        { path: 'formatList-fileUpload', loadChildren: () => import('./modules/format-list-file-upload/format-list-file-upload.module').then(m => m.FormatListFileUploadModule) },
        { path: 'file-admin', loadChildren: () => import('./modules/file-admin/file-admin.module').then(m => m.FileAdminModule) },
        { path: 'mapping-config', loadChildren: () => import('./modules/mapping-config/mapping-config.module').then(m => m.MappingConfigModule) },
        { path: 'dataprocess', loadChildren: () => import('./modules/data-process/data-process.module').then(m => m.DataProcessModule) },
        { path: 'sales', loadChildren: () => import('./modules/sales-reporting/sales-reporting.module').then(m => m.SalesReportingModule) },
  
      ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
