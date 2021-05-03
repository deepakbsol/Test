import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileAdminRoutingModule } from './file-admin-routing.module';
import { FileAdminComponent } from './file-admin.component';
import { UploadedFileListComponent } from './component/uploaded-file-list/uploaded-file-list.component';


@NgModule({
  declarations: [FileAdminComponent, UploadedFileListComponent],
  imports: [
    CommonModule,
    FileAdminRoutingModule
  ]
})
export class FileAdminModule { }
