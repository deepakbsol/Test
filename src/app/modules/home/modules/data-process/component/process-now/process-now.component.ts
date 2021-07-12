import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/modules/user/model/User';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { UploadedFile } from '../../../file-admin/model/model';
import { FileAdminService } from '../../../file-admin/service&route/file-admin.service';
import { ConfigData } from '../../../file-format/model/file-format-model';
import { FormatListFileUploadService } from '../../../format-list-file-upload/route-service/format-list-file-upload.service';
import { MappingOutput } from '../../../mapping-config/model/mappingOutput';
import { DataProcessService } from '../../service&route/data-process.service';

@Component({
  selector: 'app-process-now',
  templateUrl: './process-now.component.html',
  styleUrls: ['./process-now.component.scss']
})
export class ProcessNowComponent implements OnInit {

  constructor(private dataProcessService:DataProcessService,
    private tostService:ToastrService,
    private modalService:NgbModal,
    private router:Router,
    private appServiceService:AppServiceService,
    private formatListFileUploadService:FormatListFileUploadService,
    private fileAdminService:FileAdminService
   ) { }
  mappingOutput:MappingOutput=new MappingOutput();
  fileUploadStartDate='';
  fileUploadEndDate='';
  user:any;
  ngOnInit(): void {
    this.mappingOutput=this.dataProcessService.getMappingData();
    console.log('data-->'+JSON.stringify(this.mappingOutput));
    this.user=JSON.parse(localStorage.getItem('userDtls')||'{}');
  }


  
  isValidStartDate=false;
  public startDateValidation():boolean{
    this.isValidStartDate=false;
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte.toString());
    let currentDate=this.appServiceService.getCurrentDateTime();
    console.log('current date-->'+currentDate);
    if(new Date(this.fileUploadStartDate) !=null && new Date(dte) !=null ){
      console.log(new Date(dte)>new Date(this.fileUploadStartDate));
      if(new Date(this.fileUploadEndDate) !=null && new Date(this.fileUploadStartDate)>new Date(this.fileUploadEndDate)){
        this.tostService.error('Start date should not greater then end date');
        this.isValidStartDate=false;
        return false;
      }
      this.isValidStartDate=true;
      return true;
    }
    this.isValidStartDate=false;
    return false;
  }
  isValidEndDate=false;
  public endDateValidation():boolean{
    this.isValidEndDate=false;
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte.toString());
    if(new Date(this.fileUploadEndDate) !=null && new Date(dte) !=null ){
      console.log(new Date(dte)>new Date(this.fileUploadStartDate));
     if(new Date(this.fileUploadStartDate) !=null && new Date(this.fileUploadStartDate)>new Date(this.fileUploadEndDate)){
        this.tostService.error('End date should not less then start date');
        this.isValidEndDate=false;
        return false;
      }
      this.isValidEndDate=true;
      return true;
    }
    this.isValidEndDate=false;
    return false;
  }


  
  isLinear = false;
  
  closeResult='';
  fileType:string=".csv,.xlsx,.xml,.json,.txt";
  uploadFileType="";
  slectedFile="choose file";
  file:any;
  postUrl="";
  isFileBrowsed:boolean=false;
  uploadedFileSize=0;
  configData:ConfigData[]=new Array<ConfigData>();

  fileUpload(content:any){
    this.dataProcessService.getConfigFormatDtls(this.mappingOutput).subscribe(data=>{
      console.log(data);
      this.configData=data;
    console.log('res-->'+this.configData);
    this.uploadFileType="";
    this.slectedFile="choose file";
    this.postUrl="";
    this.isFileBrowsed=false;
    this.uploadedFileSize=0;
    
      this.modalService.open(content, {size: 'xl',animation:true,backdrop:false,scrollable:false})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

  formatName='';
  formatMatch=0;
  onFileSelect(event:any,status:string,content:any) {
    console.log(status);
    this.formatMatch=0;
    if(status=='browse' && (event.target.files.length > 0)){
      this.slectedFile=event.target.files[0].name;
      console.log("file-->"+this.slectedFile);
      this.uploadFileType=this.slectedFile.substring(this.slectedFile.lastIndexOf('.')+1);
      console.log('type-->'+this.uploadFileType);
      this.uploadedFileSize=event.target.files[0].size/1000000;
      console.log('size-->'+this.uploadedFileSize);
      console.log('config=='+this.configData);
      for(let format of this.configData){
      if(this.slectedFile.includes(format.formatname) && this.appServiceService.uploadFileType.includes(this.uploadFileType)){
        if (this.uploadedFileSize <= 0) {
          this.tostService.error('selected file is empty');
        }else{
          this.isFileBrowsed=true;
          this.file=event.target.files[0];
          this.isFileBrowsed=true;
          console.log(this.uploadFileType+" - "+typeof(this.file));
        }
        this.formatName=format.formatname;
        this.formatMatch=1;
        break;
      }
    }
    if(this.formatMatch!=1){
      this.tostService.error('Please select valid file');
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
    console.log('file upload type-->'+this.file.name+"-->"+this.user.rrrCommonDtls.companyId);
    this.formatListFileUploadService.checkFileUploaded(this.file.name,this.user.rrrCommonDtls.companyId).subscribe((data:any)=>{
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

  uploadFile(){
    this.file;
    const formData = new FormData();
    formData.append('file',this.file);
    formData.append('formatname',this.formatName);
    this.formatListFileUploadService.uploadFile(formData,this.postUrl).subscribe((data:any)=>{
      console.log(JSON.stringify(data));
      this.tostService.success(data.responseMessage);
    },(error) => {
      if(error.status==500){
        this.tostService.error(JSON.stringify(error.error.message));
      }else{
        this.tostService.error(JSON.stringify(error.error.responseMessage));
      }
    });
  }
  userConformed(userChoise:string){
    console.log(userChoise);
    this.modalService.dismissAll();
    if(userChoise=='yes'){
        this.uploadFile();
    }
  }
  processableFileList:Array<UploadedFile>=new Array<UploadedFile>();
  processaleFile(content:any,map:MappingOutput){
    this.dataProcessService.processaleFile(map,this.fileUploadStartDate,this.fileUploadEndDate).subscribe(data=>{
    this.processableFileList=data;
    console.log('file list-->'+JSON.stringify(this.processableFileList))
    this.modalService.open(content, {size: 'xl',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });    
  },(err)=>{
    console.log('err-->'+JSON.stringify(err));
    this.tostService.error(err.error.responseMessage);
  });
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
  mappingProcess={
    mapDtls:new MappingOutput(),
    filesDtls:new Array<UploadedFile>(),
    startDate:'',
    endDate:''
  }
  processMapping(){
    console.log(this.mappingOutput.mappingId+'-->processableFileList-->'+JSON.stringify(this.processableFileList));
    let flag=false;
    for(let data of this.processableFileList){
      console.log('res-->'+data.isprocessable);
      if(data.isprocessable){
        flag=true;
        console.log('flag-->'+flag);
        this.mappingProcess.filesDtls.push(data);
      }
    }
    if(flag){
      this.mappingProcess.mapDtls=this.mappingOutput;
      this.mappingProcess.startDate=this.fileUploadStartDate;
      this.mappingProcess.endDate=this.fileUploadEndDate;

      //call api  executemapping
      this.dataProcessService.processUnprocessedFiles(this.mappingProcess).subscribe(data=>{
        console.log('data-->'+data);
        this.tostService.success('successfully processed mapping');
      },err=>{
        this.tostService.error('error while processing mapping');
      });      
      this.mappingProcess.mapDtls=new MappingOutput();
      this.mappingProcess.filesDtls=new Array<UploadedFile>();
      this.mappingProcess.startDate='';
      this.mappingProcess.endDate='';
    }
  }

}
