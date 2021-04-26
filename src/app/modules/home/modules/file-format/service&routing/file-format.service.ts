import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ɵangular_packages_router_router_l } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MappingsData } from '../model/file-format-model';
@Injectable({
  providedIn: 'root'
})
export class FileFormatService {

  constructor(private httpClient:HttpClient) { }

  public getFormatList():Observable<any>{
    return this.httpClient.get(environment.resource_server+'tableconfig/formatList');
  }
  public uploadFile(formData:any,postUrl:string):Observable<any>{
    return this.httpClient.post(environment.resource_server+'tableconfig/'+postUrl, formData);
    
  }
  public createFormat(configDtls:any,postUrl:string):Observable<any>{
    return this.httpClient.post(environment.resource_server+'tableconfig/'+postUrl,configDtls);
  }
  public downloadFormatData(configId:number):Observable<any>{
    return this.httpClient.get(environment.resource_server+'tableconfig/formatDownload/'+`${configId}`);
  }
  public updateFormat(configDtls:any){
    return this.httpClient.put(environment.resource_server+'tableconfig/updateFormat',configDtls);
  }
  public deleteFormat(configId:number){
    return this.httpClient.delete(environment.resource_server+'tableconfig/deleteFormat/'+`${configId}`)
  }
  public getFormatMapData(formatId:number,companyId:number):Observable<MappingsData[]>{
    return this.httpClient.get<MappingsData[]>(environment.resource_server+'tableconfig/formatMappingData/'+`${formatId}/`+`${companyId}`);
  }
}
