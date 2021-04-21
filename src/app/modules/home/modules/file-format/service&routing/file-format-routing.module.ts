import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileFormatUploadComponent } from '../components/file-format-upload/file-format-upload.component';
import { FileFormatComponent } from '../file-format.component';

const routes: Routes = [
  { path: '', component: FileFormatComponent ,
  children:[
    {path:'',component:FileFormatUploadComponent}
  ]


}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileFormatRoutingModule { }
