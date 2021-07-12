import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MappingOutput } from './modules/mapping-config/model/mappingOutput';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  selectedMappingList:Array<MappingOutput>=new Array<MappingOutput>();
  constructor(private httpClient:HttpClient) { }

  getMappingList():Observable<MappingOutput[]>{
    return this.httpClient.get<MappingOutput[]>(environment.resource_server+'mappingProcess/mappingList');
  }

  setSelectedMapping(mappingList:Array<MappingOutput>){
    this.selectedMappingList=mappingList;
  }
  getSellectedMappingList(){
    return this.selectedMappingList;
  }
}
