import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileAdminComponent } from '../file-admin.component';
import { FileAdminGuard } from './file-admin.guard';

const routes: Routes = [
  { path: '', component: FileAdminComponent,
   resolve:{
    data:FileAdminGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileAdminRoutingModule { }
