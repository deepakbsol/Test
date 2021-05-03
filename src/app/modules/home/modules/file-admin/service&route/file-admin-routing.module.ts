import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileAdminComponent } from './file-admin.component';

const routes: Routes = [{ path: '', component: FileAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileAdminRoutingModule { }
