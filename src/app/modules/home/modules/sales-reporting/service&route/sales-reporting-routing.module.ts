import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreDestTablesGuard } from '../../mapping-config/service&route/core-dest-tables.guard';
import { CreateReportingComponent } from '../component/create-reporting/create-reporting.component';
import { MenuComponent } from '../component/menu/menu.component';
import { ViewReportingComponent } from '../component/view-reporting/view-reporting.component';
import { SalesReportingComponent } from '../sales-reporting.component';

const routes: Routes = [
  { path: '', component: SalesReportingComponent,
  children:[
    {path:'',component:MenuComponent},
    {path:'createreporting',component:CreateReportingComponent,
    resolve:{
      data:CoreDestTablesGuard
    }
  },
    {path:'viewreporting',component:ViewReportingComponent}
  ] 

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportingRoutingModule { }
