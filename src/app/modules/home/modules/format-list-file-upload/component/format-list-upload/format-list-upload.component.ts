import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigData, MappingsData } from '../../../file-format/model/file-format-model';
import { FormatListFileUploadService } from '../../route-service/format-list-file-upload.service';
import * as fileSaver from 'file-saver';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-format-list-upload',
  templateUrl: './format-list-upload.component.html',
  styleUrls: ['./format-list-upload.component.scss']
})
export class FormatListUploadComponent implements OnInit {
  fileType:string=".csv,.xlsx,.xml,.json,.txt";
  configData:ConfigData[]=new Array<ConfigData>();
  formatMappingData:MappingsData[]=new Array<MappingsData>();
  uploadFileType="";
  slectedFile="choose file";
  file:any;
  postUrl="";
  isFileBrowsed:boolean=false;
  uploadedFileSize=0;
  
  constructor(private activatedRout:ActivatedRoute,
    private modalService:NgbModal,
    private formatListFileUploadService:FormatListFileUploadService,
    private appServiceService:AppServiceService,
    private tostService:ToastrService) { 
    
      
  }

  ngOnInit(): void {
    for(let data of Object.keys(this.activatedRout.snapshot.data)){
      var x=this.activatedRout.snapshot.data[data];
      for(let d of x){
        this.configData.push(d);
      }
    }
  }
  closeResult: string=''; 
  openFormatView(content:any) {
    console.log(content);
    this.modalService.open(content, {size: 'xl',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openFormatUpload(content:any){
  this.uploadFileType="";
  this.slectedFile="choose file";
  this.postUrl="";
  this.isFileBrowsed=false;
  this.uploadedFileSize=0;
  
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
 selectedFormat:ConfigData=new ConfigData();
  formatDtls(data:ConfigData){
    this.formatMappingData.length=0;
    this.selectedFormat=data;
    console.log('data'+JSON.stringify(data));
    this.formatListFileUploadService.getFormatMappingDtls(data.configId,data.rrrCommonDtls.companyId).subscribe(data=>{
      for(let d of data){
        this.formatMappingData.push(d);
      }
      console.log(this.formatMappingData);
    });
  }
  download(){
    console.log(this.selectedFormat);
    if(this.selectedFormat.configId>0){
      this.formatListFileUploadService.downloadFormatData(this.selectedFormat.configId).subscribe(data=>{
        fileSaver.saveAs(new Blob([this.base64ToArrayBuffer(data.file)], 
          {type:this.appServiceService.filedownloadType.xlsx}),data.filename+".xlsx");
      });
    }
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
  selectedFormatUpload(data:ConfigData){
    this.selectedFormat=data;
  }
  onFileSelect(event:any,status:string,content:any) {
    console.log(status);
    if(status=='browse' && (event.target.files.length > 0)){
      
      this.slectedFile=event.target.files[0].name;
      console.log("file-->"+this.slectedFile);
      this.uploadFileType=this.slectedFile.substring(this.slectedFile.lastIndexOf('.')+1);
      console.log('type-->'+this.uploadFileType);
      this.uploadedFileSize=event.target.files[0].size/1000000;
      console.log('size-->'+this.uploadedFileSize);
      if(!this.slectedFile.includes(this.selectedFormat.formatname) || !this.appServiceService.uploadFileType.includes(this.uploadFileType)){
        this.tostService.error('Please select valid file');
      }else{
        if (this.uploadedFileSize <= 0) {
          this.tostService.error('selected file is empty');
        }else{
          this.file=event.target.files[0];
          this.isFileBrowsed=true;
          console.log(this.uploadFileType+" - "+typeof(this.file));
        }
      }
    }else if(status=='upload'){
    switch(this.uploadFileType){
			case 'csv':
				this.postUrl = 'csv';
				break;
			case 'xlsx':
				this.postUrl = 'excel';
			    break;
			case 'xml':
				this.postUrl = 'xml';
			    break;
			case 'json':
				this.postUrl = 'json';
		    	break;
			case 'txt':
				this.postUrl = 'txt';
		    	break;
    }
    this.formatListFileUploadService.checkFileUploaded(this.file.name,this.selectedFormat.rrrCommonDtls.companyId).subscribe((data:any)=>{
      console.log(data);
       if(data.responseMessage=='fileAvailable'){
         this.confirmAlert(content);
        }else{
          this.uploadFile();
        }
    })
    this.isFileBrowsed=false;
    this.modalService.dismissAll();
    }
    
  }
  
  confirmAlert(content:any) {
    console.log(content);
    this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  userConformed(userChoise:string){
    console.log(userChoise);
    this.modalService.dismissAll();
    if(userChoise=='yes'){
        this.uploadFile();
    }
  }
  uploadFile(){
    this.file;
    const formData = new FormData();
    formData.append('file',this.file);
    formData.append('formatname',this.selectedFormat.formatname);
    this.formatListFileUploadService.uploadFile(formData,this.postUrl).subscribe((data:any)=>{
      console.log(JSON.stringify(data));
      this.tostService.success(data.responseMessage);
    },(error) => {
      if(error.status==500){
        this.tostService.error(JSON.stringify(error.error.message));
      }else{
        this.tostService.error(JSON.stringify(error.error.responseMessage));
      }
      //console.log("error "+JSON.stringify(error.error.message));
    });
  }
}

