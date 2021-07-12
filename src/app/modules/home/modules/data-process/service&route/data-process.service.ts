import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadedFile } from '../../file-admin/model/model';
import { ConfigData } from '../../file-format/model/file-format-model';
import { MappingOutput } from '../../mapping-config/model/mappingOutput';

@Injectable({
  providedIn: 'root'
})
export class DataProcessService {
  
  constructor(private httpClient:HttpClient) { }
  getMappingList():Observable<MappingOutput[]>{
    return this.httpClient.get<MappingOutput[]>(environment.resource_server+'mappingProcess/mappingList');
  }
  getMappingOtherDetails(mappingOutput:MappingOutput):Observable<String>{
    return this.httpClient.get<String>(environment.resource_server+'mappingProcess/coreTable/'+`${mappingOutput.destTableId}`);
  }
  mapping:MappingOutput=new MappingOutput();
  setMappingData(data:MappingOutput){
    this.mapping=data;
  }
  getMappingData():MappingOutput{
    return this.mapping;
  }
  getConfigFormatDtls(mapping:MappingOutput):Observable<ConfigData[]>{
    return this.httpClient.post<ConfigData[]>(environment.resource_server+'mappingProcess/configFormat/',mapping);
  }
  processaleFile(map:MappingOutput,startDate:any,endDate:any):Observable<UploadedFile[]>{
    return this.httpClient.post<UploadedFile[]>(environment.resource_server+'mappingProcess/getexecutionfiles/'+`${startDate}/`+`${endDate}`,map);
  }
  processUnprocessedFiles(data:any):Observable<string>{
    return this.httpClient.post<string>(environment.resource_server+'mappingProcess/executemapping',data);
  }
  
}
