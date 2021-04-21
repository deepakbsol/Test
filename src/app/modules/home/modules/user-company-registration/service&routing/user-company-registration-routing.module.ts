import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { MenuComponent } from '../components/menu/menu.component';
import { UserCompanyRegistrationComponent } from '../user-company-registration.component';
import { UserRegisterComponent } from '../components/user-register/user-register.component';
import { CompanyRegistrationComponent } from '../components/company-registration/company-registration.component';
import { UserRoleComponent } from '../components/user-role/user-role.component';
import { CoreTableModuleHubGuard } from './core-table-module-hub.guard';
import { RequiredUserDataGuard } from './required-user-data.guard';
const routes: Routes = [
  {
   path: '', component: UserCompanyRegistrationComponent ,
   children: [
        {path:'menu',component:MenuComponent},
        {path:'userRegistration',
        component:UserRegisterComponent,
        resolve:{
          data:RequiredUserDataGuard
        }
      },
        {path:'companyRegistration',component:CompanyRegistrationComponent},
        {
          path:'userRole',
          component:UserRoleComponent,
          resolve:{
            data:CoreTableModuleHubGuard
          }
      }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCompanyRegistrationRoutingModule { }
