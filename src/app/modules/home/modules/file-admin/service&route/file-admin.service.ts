import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadedFile } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class FileAdminService {
  constructor(private httpClient:HttpClient) { }
 public getUploadedFiles():Observable<UploadedFile[]>{
   return this.httpClient.get<UploadedFile[]>(environment.resource_server+'fileAdmin/getAllUploadedFile')
 }
 public download(data:UploadedFile):Observable<any>{
   const httpParms=new HttpParams({
     fromObject:{
      filename:data.fileName,
      path:data.filePath,
      originalFileName:data.originalFileName,
      uploadId:data.uploadId+''
     }
   });
    return this.httpClient.get(environment.resource_server+
      'fileAdmin/downloadFile',{params:httpParms})
 }
 public updateDonotProcess(data:UploadedFile):Observable<string>{
  return this.httpClient.post<string>(environment.resource_server+'fileAdmin/updateDonotProcess',data);
 }
}
