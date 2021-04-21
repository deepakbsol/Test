import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCompanyRegistrationRoutingModule } from './service&routing/user-company-registration-routing.module';
import { UserCompanyRegistrationComponent } from './user-company-registration.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserCompanyRegistrationComponent, 
    MenuComponent, UserRegisterComponent, 
    CompanyRegistrationComponent,
     UserRoleComponent],
  imports: [
    CommonModule,
    UserCompanyRegistrationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserCompanyRegistrationModule { }
