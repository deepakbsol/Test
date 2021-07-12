import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormatListFileUploadService } from '../../format-list-file-upload/route-service/format-list-file-upload.service';
import { MappingOutput } from '../../mapping-config/model/mappingOutput';
import { DataProcessService } from './data-process.service';

@Injectable({
  providedIn: 'root'
})
export class MappingListGuard implements Resolve<MappingOutput[]> {
  constructor(private dataProcessService:DataProcessService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   MappingOutput[] | Observable<MappingOutput[]> | Promise<MappingOutput[]> {
    return this.dataProcessService.getMappingList();
  }
  
}