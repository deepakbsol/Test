import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigData } from '../../file-format/model/file-format-model';
import { FormatListFileUploadService } from './format-list-file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class FormatListGuard implements Resolve<ConfigData[]> {
  constructor(private formatListFileUploadService:FormatListFileUploadService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ConfigData[] | Observable<ConfigData[]> | Promise<ConfigData[]> {
    return this.formatListFileUploadService.getFormatList();
  }

  
}
