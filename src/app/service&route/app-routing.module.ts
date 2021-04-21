import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';  
import { AuthGuardGuard } from './auth-guard.guard';
const routes: Routes = [
  //{path:"",redirectTo:"user",pathMatch:"full"},
  { path: 'user', loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)},
  { path: '', loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule),canActivate:[AuthGuardGuard]},
  {path:"**",redirectTo:"user"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
