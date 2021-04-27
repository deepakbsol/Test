import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatListFileUploadRoutingModule } from './route-service/format-list-file-upload-routing.module';
import { FormatListFileUploadComponent } from './format-list-file-upload.component';
import { FormatListUploadComponent } from './component/format-list-upload/format-list-upload.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FormatListFileUploadComponent, FormatListUploadComponent],
  imports: [
    CommonModule,
    FormatListFileUploadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormatListFileUploadModule { }
