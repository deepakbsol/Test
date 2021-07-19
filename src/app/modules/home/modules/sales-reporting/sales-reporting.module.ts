import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportingComponent } from './sales-reporting.component';
import { CreateReportingComponent } from './component/create-reporting/create-reporting.component';
import { ViewReportingComponent } from './component/view-reporting/view-reporting.component';
import { SalesReportingRoutingModule } from './service&route/sales-reporting-routing.module';
import { MenuComponent } from './component/menu/menu.component';


@NgModule({
  declarations: [
    SalesReportingComponent,
    CreateReportingComponent,
    ViewReportingComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SalesReportingRoutingModule
  ]
})
export class SalesReportingModule { }
