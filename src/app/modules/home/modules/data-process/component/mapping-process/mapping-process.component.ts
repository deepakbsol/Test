import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/modules/home/home.service';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { downloadList } from '../../../mapping-config/model/downloadDtls';
import { MappingOutput } from '../../../mapping-config/model/mappingOutput';
import { DataProcessService } from '../../service&route/data-process.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-mapping-process',
  templateUrl: './mapping-process.component.html',
  styleUrls: ['./mapping-process.component.scss']
})
export class MappingProcessComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
    private modalService:NgbModal,
    private dataProcessService:DataProcessService,
    private router:Router,
    private tosterService:ToastrService,
    private homeService:HomeService,
    private appServiceService:AppServiceService
    ) { }
   mappingList:Array<MappingOutput>=new Array<MappingOutput>();
  ngOnInit(): void {
    if(this.homeService.getSellectedMappingList().length>0){
      this.mappingList=this.homeService.getSellectedMappingList();
    }else{
      this.mappingList=this.activatedRoute.snapshot.data.data;
    }
    console.log('data-->'+JSON.stringify(this.mappingList));
  }
  closeResult: string=''; 
  coreTable='';
  selectedMapping:MappingOutput=new MappingOutput();
  viewMappingOtherDetails(content:any,mappingOutput:MappingOutput){
    console.log('data--->'+JSON.stringify(mappingOutput));
    if(mappingOutput.mappingId>0){
      this.selectedMapping=mappingOutput;
      this.dataProcessService.getMappingOtherDetails(mappingOutput).subscribe(
        (data:any)=>{
          console.log('res-->'+JSON.stringify(data));
         this.coreTable=data.responseMessage; 
        }
      );
      this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  mappingOtherDetails(mappingOutput:MappingOutput){
    console.log('mapping data-->'+JSON.stringify(mappingOutput));
  }
  processNow(data:MappingOutput){
    console.log('data-->'+JSON.stringify(data));
    this.dataProcessService.setMappingData(data);
    this.router.navigate(["/dataprocess/processnow"]);
  }
  downloadList:Array<downloadList> =new Array<downloadList>();
  downloadAgain(mappingOutput:MappingOutput,content:any){
    this.dataProcessService.downloadAgain(mappingOutput.mappingId).subscribe(data=>{
      this.downloadList=data;
      console.log('List-->'+JSON.stringify(this.downloadList));
     if(this.downloadList.length>0){
      this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }else{
      this.tosterService.error('YOUR SELECTED MAPPING IS NOT PROCESSED AT ALL');
    }
    });
  }
  downloadData(download:downloadList){
    this.dataProcessService.downloadResultData(download.triggerId,download.coreTabId).subscribe(data=>{
      console.log('file-->'+JSON.stringify(data));
      fileSaver.saveAs(new Blob([this.base64ToArrayBuffer(data.file)], 
        {type:this.appServiceService.filedownloadType.xlsx}),data.filename+".xlsx");
    },(err)=>{
      console.log('error while download file');
    });
  }

  base64ToArrayBuffer(base64:any) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

}
