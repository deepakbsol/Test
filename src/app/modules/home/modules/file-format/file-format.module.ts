import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileFormatRoutingModule } from './service&routing/file-format-routing.module';
import { FileFormatComponent } from './file-format.component';
import { FileFormatUploadComponent } from './components/file-format-upload/file-format-upload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FileFormatComponent, FileFormatUploadComponent],
  imports: [
    CommonModule,
    FileFormatRoutingModule,
    ReactiveFormsModule
  ]
})
export class FileFormatModule { }
