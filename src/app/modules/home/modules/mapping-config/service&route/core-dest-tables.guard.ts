import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MappingConfigService } from './mapping-config.service';

@Injectable({
  providedIn: 'root'
})
export class CoreDestTablesGuard implements Resolve<any> {
  constructor(private mappingConfigService:MappingConfigService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.mappingConfigService.getCoreDestTables();
  }
}
