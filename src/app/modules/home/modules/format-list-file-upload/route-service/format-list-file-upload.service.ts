import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigData, MappingsData } from '../../file-format/model/file-format-model';

@Injectable({
  providedIn: 'root'
})
export class FormatListFileUploadService {

  constructor(private httpClient:HttpClient) { }

  public getFormatList():Observable<ConfigData[]>{
    return this.httpClient.get<ConfigData[]>(environment.resource_server+'tableconfig/formatList');
  }

  public getFormatMappingDtls(formatId:number,companyId:number):Observable<MappingsData[]>{
    return this.httpClient.get<MappingsData[]>(environment.resource_server+'tableconfig/formatMappingData/'+`${formatId}/`+`${companyId}`);
  }

  public downloadFormatData(configId:number):Observable<any>{
    return this.httpClient.get(environment.resource_server+'tableconfig/formatDownload/'+`${configId}`);
  }

  public checkFileUploaded(filename:string,companyId:number):Observable<Boolean>{
    return this.httpClient.get<Boolean>(environment.resource_server+'fileUpload/checkfileuploaded/'+`${filename}`+`/${companyId}`);
  }
}
