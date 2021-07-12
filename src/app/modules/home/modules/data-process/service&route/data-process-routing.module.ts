import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MappingProcessComponent } from '../component/mapping-process/mapping-process.component';
import { ProcessNowComponent } from '../component/process-now/process-now.component';
import { DataProcessComponent } from '../data-process.component';
import { MappingListGuard } from './mapping-list.guard';

const routes: Routes = [
  { path: '', component: DataProcessComponent ,
  children:[
    {path:'',component:MappingProcessComponent,
    resolve:{
      data:MappingListGuard
    }
    },
    {path:'processnow',component:ProcessNowComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataProcessRoutingModule { 

  
}
