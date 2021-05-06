import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileAdminRoutingModule } from './service&route/file-admin-routing.module';
import { FileAdminComponent } from './file-admin.component';
import { UploadedFileListComponent } from './component/uploaded-file-list/uploaded-file-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FileAdminComponent, UploadedFileListComponent],
  imports: [
    CommonModule,
    FileAdminRoutingModule,
    FormsModule
  ]
})
export class FileAdminModule { }
