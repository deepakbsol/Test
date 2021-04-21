import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_l } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileFormatService {

  constructor(private httpClient:HttpClient) { }

  public uploadFile(formData:any,postUrl:string):Observable<any>{
    return this.httpClient.post(environment.resource_server+'tableconfig/'+postUrl, formData);
    
  }
  public createFormat(configDtls:any,postUrl:string):Observable<any>{
    return this.httpClient.post(environment.resource_server+'tableconfig/'+postUrl,configDtls);
  }
}
