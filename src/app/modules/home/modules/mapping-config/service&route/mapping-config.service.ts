import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MappingOutput } from '../model/mappingOutput';

@Injectable({
  providedIn: 'root'
})
export class MappingConfigService {
  
  constructor(private httpClient:HttpClient) {
  }
  public getCoreDestTables():Observable<any>{
    return this.httpClient.get(environment.resource_server+'mapping/coreAndDestTable');
  }
  public checkMappingName(mappingOutput:MappingOutput):Observable<any>{
    return this.httpClient.get(environment.resource_server+'mapping/validateMappingName/'+`${mappingOutput.mappingId}/`+`${mappingOutput.mappingName}`);
  }



}
