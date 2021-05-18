import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingConfigRoutingModule } from './service&route/mapping-config-routing.module';
import { MappingConfigComponent } from './mapping-config.component';


@NgModule({
  declarations: [MappingConfigComponent],
  imports: [
    CommonModule,
    MappingConfigRoutingModule
  ]
})
export class MappingConfigModule { }
