import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMappingComponent } from '../component/create-mapping/create-mapping.component';
import { MappingConfigComponent } from '../mapping-config.component';

const routes: Routes = [
  { path: '', component: MappingConfigComponent,
  children:[
    {path:'create',component:CreateMappingComponent}
  ] 

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingConfigRoutingModule { }
