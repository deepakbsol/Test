import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { HomedataComponent } from './components/homedata/homedata.component';


@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, FooterComponent,
     SidebarComponent, DisplayUserComponent, 
     HomedataComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
