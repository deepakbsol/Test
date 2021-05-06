import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadedFileListComponent } from '../component/uploaded-file-list/uploaded-file-list.component';
import { FileAdminComponent } from '../file-admin.component';
import { FileAdminGuard } from './file-admin.guard';

const routes: Routes = [

  
  { path: '', component: FileAdminComponent ,
  children:[
    { path: '', component: UploadedFileListComponent,
      resolve:{
            data:FileAdminGuard
      }
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileAdminRoutingModule { }
