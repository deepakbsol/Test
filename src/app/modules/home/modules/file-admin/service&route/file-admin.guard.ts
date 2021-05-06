import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadedFile } from '../model/model';
import { FileAdminService } from './file-admin.service';

@Injectable({
  providedIn: 'root'
})
export class FileAdminGuard implements Resolve<UploadedFile[]> {
  constructor(private fileAdminService:FileAdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UploadedFile[] | Observable<UploadedFile[]> | Promise<UploadedFile[]> {
    return this.fileAdminService.getUploadedFiles();
  }  
}
