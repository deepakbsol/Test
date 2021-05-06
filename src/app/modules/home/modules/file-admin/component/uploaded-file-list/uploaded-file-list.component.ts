import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { UploadedFile } from '../../model/model';
import { FileAdminService } from '../../service&route/file-admin.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-uploaded-file-list',
  templateUrl: './uploaded-file-list.component.html',
  styleUrls: ['./uploaded-file-list.component.scss']
})
export class UploadedFileListComponent implements OnInit {

  uploadedFileList:UploadedFile[]=new Array<UploadedFile>();
  constructor(private activatedRout:ActivatedRoute,private modalService:NgbModal,
    private tostService:ToastrService,private appServiceService:AppServiceService,
    private fileAdminService:FileAdminService) { }

  ngOnInit(): void {
   // console.log(JSON.stringify(this.activatedRout.snapshot.data));
   this.uploadedFileList=this.activatedRout.snapshot.data.data;
   
   console.log(this.uploadedFileList);
  }
  changedDonotProcess(e:any,data:UploadedFile){
    console.log(data);

    if(e.target.checked){
        data.donotProcess='P'
    }else{
      data.donotProcess='D'
    }
    this.fileAdminService.updateDonotProcess(data).subscribe((data:any)=>{
      this.tostService.success(data.responseMessage)
    },(error)=>{
      console.log(error)
      if(e.target.checked){
        data.donotProcess='D'
        data.isprocessable=false;
      }else{
      data.donotProcess='P'
      data.isprocessable=true;
      }
        this.tostService.error(error.error.responseMessage);
    });
  }
  closeResult: string=''; 
  selectedFile:UploadedFile=new UploadedFile();
  openViewDetails(content:any,data:UploadedFile){
      this.selectedFile=data;
      console.log(this.selectedFile);
      this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

    public downloadFile(data:UploadedFile){
      this.fileAdminService.download(data).subscribe(data=>{
        let downloadFileType='';
        switch(data.extension){
          case'xlsx':
              downloadFileType=this.appServiceService.filedownloadType.xlsx;
              break;
          case'csv':
            downloadFileType=this.appServiceService.filedownloadType.csv;
            break;
          case'txt':
            downloadFileType=this.appServiceService.filedownloadType.txt;
            break;
          case'xml':
            downloadFileType=this.appServiceService.filedownloadType.xml;
            break;
          case'json':
            downloadFileType=this.appServiceService.filedownloadType.json;
            break;
          case 'pdf':
            downloadFileType=this.appServiceService.filedownloadType.pdf;
        }
        fileSaver.saveAs(new Blob([this.base64ToArrayBuffer(data.file)], 
          {type:downloadFileType}),data.orgfilename);
      });
      this.modalService.dismissAll();
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
