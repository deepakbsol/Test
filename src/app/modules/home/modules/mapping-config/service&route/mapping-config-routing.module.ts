import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMappingComponent } from '../component/create-mapping/create-mapping.component';
import { MappingConfigComponent } from '../mapping-config.component';
import { CoreDestTablesGuard } from './core-dest-tables.guard';

const routes: Routes = [
  { path: '', component: MappingConfigComponent,
  children:[
    {path:'create',component:CreateMappingComponent,
      resolve:{
        data:CoreDestTablesGuard
      }
    }
  ] 

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingConfigRoutingModule { }
