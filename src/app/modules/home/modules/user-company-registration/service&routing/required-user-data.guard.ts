import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCompanyRoleService } from './user-company-role.service';

@Injectable({
  providedIn: 'root'
})
export class RequiredUserDataGuard implements Resolve<any> {
  constructor(private userCompanyRoleService:UserCompanyRoleService){
  }
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userCompanyRoleService.getUserRegistrationRequiredData();
  }
  
}
