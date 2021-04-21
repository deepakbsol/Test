import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserCompanyRoleService {

  constructor(private httpClient:HttpClient,private datePipe:DatePipe) { 

  }
  public getUserRegistrationRequiredData():Observable<any>{
    return this.httpClient.get(environment.resource_server+'requiredUserRegistration');
  }
  public getCurrentDateTime():any{
    return this.datePipe.transform(new Date(),'yyyy-MM-ddThh:mm:ss')
  }
  public saveCompanyDetails(data:any):Observable<any>{
     return this.httpClient.post(environment.resource_server+'savecompany',data);
  }
  public saveUserRole(data:any):Observable<any>{
    console.log('user role');
    return this.httpClient.post(environment.resource_server+"saveUserRole",data);
  }
  public getCoreTableAndModuleHub():Observable<any>{
     return this.httpClient.get(environment.resource_server+'getCoreTableAndModule');
  }
  public userRegistration(Data:any):Observable<any>{
     return  this.httpClient.post(environment.resource_server+'userRegistration',Data);
  }


}
