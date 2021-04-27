import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormatListUploadComponent } from '../component/format-list-upload/format-list-upload.component';
import { FormatListFileUploadComponent } from '../format-list-file-upload.component';
import { FormatListGuard } from './format-list.guard';

const routes: Routes = [
  { 
    path: '', component: FormatListFileUploadComponent,

    children:[
      {path:'',component:FormatListUploadComponent,
      resolve:{
        data:FormatListGuard
      }
    },
    ]


}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatListFileUploadRoutingModule { }
