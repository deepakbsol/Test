import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { ConfigData, FormatDataDtls, MappingsData, RrrCommonDtls } from '../../model/file-format-model';
import { FileFormatService } from '../../service&routing/file-format.service';
import { ToastrService } from 'ngx-toastr';
import * as fileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
export class  MappingsConfig{
  "seqId":number;
  "col":string;
  "tabcol":string;
  "datatype":string;
  "datasize":number;
  "defaultvalue":string;
}
@Component({
  selector: 'app-file-format-upload',
  templateUrl: './file-format-upload.component.html',
  styleUrls: ['./file-format-upload.component.scss']
})
export class FileFormatUploadComponent implements OnInit {
  fileType:string=".csv,.xlsx,.xml,.json,.txt";  
  uploadForm: FormGroup;
  tableConfig:FormGroup;
  fileuploaded:any;
  formatDataDtls:FormatDataDtls;
  mappingsData:MappingsData;
  isFileUploaded:boolean=false;
  //tableupdate:FormGroup;
  tableColUpdate:FormGroup;
  isVarcharDataType:boolean=false;
  configDtls:ConfigData;
  delimiterList=[',',';','/','^'];
  formatList:Array<ConfigData>=new Array<ConfigData>();
  constructor(private formBuilder: FormBuilder, private appServiceService:AppServiceService,
    private fileFormatService:FileFormatService,private route: Router, private modalService: NgbModal,
    private tostService:ToastrService) { 
      this.mappingsData=new MappingsData(0,'','','','',0,'');
      this.configDtls=new ConfigData();
      this.formatDataDtls=new FormatDataDtls('',new Array<MappingsData>());
    this.uploadForm = this.formBuilder.group({
      file: ['',[Validators.required]],
      delimiter:['']

    });

    this.tableConfig = this.formBuilder.group({
      tableName: [{value: '', disabled: !this.isFileUploaded},[Validators.required ,Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9_]*[a-zA-Z0-9]$')]],
      fileDecription:[{value: '', disabled: !this.isFileUploaded},],
      formatName:[{value: '', disabled: !this.isFileUploaded},[Validators.required,Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9_]*[a-zA-Z0-9]$')]]
    });
    // this.tableupdate=this.formBuilder.group({
    //   selectdataType:[''],
    //   datatype:['',[Validators.required]],
    //   datasize:['']
    // });
    
    this.tableColUpdate=this.formBuilder.group({
      updatedColumn:['',[Validators.required,Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9_]*[a-zA-Z0-9]$')]]
    })
  }

  checkReservedKeyword(col:string):string{
    //console.log(this.appServiceService.keywords.includes(col.toUpperCase()));
    if(this.appServiceService.keywords.includes(col)){
      return "text-danger";
    }
    return "";
  }
  datatypeList=[
    {
      "name":"NUMBER",
    },
    {
      "name":"VARCHAR",
    },
    {
      "name":"DATE",
    }
  ]
  ngOnInit(): void {
    this.appServiceService.moduleChanged='file format';
  }
  uploadFileType='';
  postUrl='';
  isFileSelected:boolean=false;
  slectedFile='SELECT FILE';
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.isFileSelected=true;
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
      this.slectedFile=file.name;
     this.uploadFileType=file.name.substring(file.name.lastIndexOf('.')+1);
     console.log(this.uploadFileType);
    }
  }
 //isFileUploaded:boolean=false;
  onSubmit() {
    this.isFileSelected=false;
    this.viewFlage=false;
    this.editFlag=false;
    this.tableConfig.get('tableName')?.setValue('');
    this.tableConfig.get('fileDecription')?.setValue('');
    this.tableConfig.get('formatName')?.setValue('');
    this.formatDataDtls.mappings=new Array<MappingsData>();
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
    
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')?.value);
    formData.append('delimiter','');
    this.fileFormatService.uploadFile(formData,this.postUrl).subscribe(
      (res) => {
        if(this.uploadFileType=='xml'){

        }else{
        for(let extract of res){
            this.formatDataDtls.mappings.push(new MappingsData(extract.seqId,extract.col,extract.tabcol,
              extract.dateIns,extract.datatype,extract.datasize,extract.defaultvalue));
          }
          console.log(JSON.stringify(this.formatDataDtls.mappings));
          this.isFileUploaded=true;
          this.tableConfig.enable();
        }

      },(err) =>{
        console.log(err);
        this.tostService.error(JSON.stringify(err.error.responseMessage));
      } 
    );
  }
  tableColumnNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidTableColumn=true; 
    }else{
      this.tostService.error('Given Column Name '+event.target.value.toUpperCase()+' is reserved keyword');
      this.isValidTableColumn=false;
    }
  }
  isValidTableColumn:boolean=false;
  isValidTabName:boolean=false;
  tableNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidTabName=true; 
    }else{
      this.tostService.error('Given Table Name '+event.target.value.toUpperCase()+' is reserved keyword');
      this.isValidTabName=false;
    }
    console.log('setting table validation name-->'+this.isValidTabName);
  }
  isValidFormatName:boolean=false;
  formatNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidFormatName=true; 
    }else{
      this.tostService.error('Given Table Name '+event.target.value.toUpperCase()+' is reserved keyword');
      this.isValidFormatName=false;
    }
    console.log('setting table validation name-->'+this.isValidFormatName); 
  }
  editTableColumnName(){
    console.log('editTableColumnName-->');
  }

  title = 'appBootstrap';
  
  closeResult: string=''; 
  updateTableColumn:any;
  open(content:any,data:any) {
    this.updateTableColumn=data;
    this.tableColUpdate.get('updatedColumn')?.setValue(data.tabcol);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  changedTableColumn(){
    console.log('changed to-->'+JSON.stringify(this.tableColUpdate.get('updatedColumn')?.value));
    this.updateTableColumn.tabcol=this.tableColUpdate.get('updatedColumn')?.value.toUpperCase();
    console.log('here-->'+this.formatDataDtls.mappings.includes(this.updateTableColumn))
    for(let length=0 ;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==this.updateTableColumn.seqId){
        this.formatDataDtls.mappings[length]=this.updateTableColumn;
      }
    }
    console.log('updated ->'+JSON.stringify(this.formatDataDtls.mappings));
    this.modalService.dismissAll();
  }

  isAssignedDataTypeForAll:boolean=false;
  getselectedDataType(data:any){
   
    //console.log('daa-->'+this.tableupdate.get('datasize')?.value);
    //data.datatype=this.tableupdate.get('datatype')?.value;
    if(data.datatype !='VARCHAR'){
      data.datasize=0;
     // data.datasize=this.tableupdate.get('datasize')?.value;
    }
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==data.seqId){
        this.formatDataDtls.mappings[length]=data;
      }
    }
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].datatype!=null){
        this.isAssignedDataTypeForAll=true;
      }else{
        this.isAssignedDataTypeForAll=false;
        break;
      }
    }
   // this.tableupdate.enable();
    //this.isVarcharDataType=true;
    console.log('data type-->'+JSON.stringify(data));
    
  }
  isNullable(event:any,data:any){
    console.log('event-->'+JSON.stringify(event.target.checked));
    if(!event.target.checked){
      data.defaultvalue="N";
    }
    if(event.target.checked){
      data.defaultvalue="Y";
    }
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==data.seqId){
        this.formatDataDtls.mappings[length]=data;
      }
      }
    console.log('all-->'+JSON.stringify(this.formatDataDtls.mappings));
  }
  dataLength(data:any){
    //data.datasize=this.tableupdate.get('datasize')?.value;
    console.log(data.datasize);
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==data.seqId){
        if(data.datasize>0 && data.datasize<4000){
          this.formatDataDtls.mappings[length]=data;
        }else{
           this.tostService.error('Please insert the size between 1 to 4000')
        }
      }
    }
  }
  checkValidData():boolean{
      if(!this.isValidTabName){
        this.tostService.error('please provide valid table name');
        return false;
      }
      if(!this.isValidFormatName){
        this.tostService.error('please provide valid format name');
        return false;
      }
      for(let length=0;length<this.formatDataDtls.mappings.length;length++){
        if(this.formatDataDtls.mappings[length].datatype=='VARCHAR' &&
          (this.formatDataDtls.mappings[length].datasize<=0 ||this.formatDataDtls.mappings[length].datasize>=4000)){
          this.tostService.error('Incorrect datatype size for column '+this.formatDataDtls.mappings[length].col+' , Value range 1 to 4000');
          return false;
        }
        if(this.appServiceService.keywords.includes(this.formatDataDtls.mappings[length].tabcol)){
          this.tostService.error('Reserved keyword used for column name '+this.formatDataDtls.mappings[length].tabcol);
         return false;
      }
      }
      console.log('file type-->'+this.uploadFileType);
      if(this.uploadFileType=='csv'){
        if(this.isSelectedDelimiter==false){
          this.tostService.error('Please select delimiter');
          return false;
        }
      }
      return true;
   
  }
  createFormatData(){
    if(this.checkValidData()){
      console.log('go to next stape ');
      
      //this.configDtls.tablename=this.tableConfig.get('tableName')?.value;
      //this.configDtls.desc=this.tableConfig.get('fileDecription')?.value;
      
      //this.configDtls.formatname=this.tableConfig.get('formatName')?.value;
      //this.configDtls.colCount=this.formatDataDtls.mappings.length;
      //this.configDtls.fileExt="."+this.uploadFileType;

      //this.configDtls.delimiter=this.uploadForm.get('delimiter')?.value;
      //this.configDtls.rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
      //this.configDtls.mappings=this.formatDataDtls.mappings;

      
    let formatData={
      "tablename":this.tableConfig.get('tableName')?.value,
      "desc":this.tableConfig.get('fileDecription')?.value,
      "formatname":this.tableConfig.get('formatName')?.value,
      "fileExt":"."+this.uploadFileType,
      "colCount":this.formatDataDtls.mappings.length,
      "delimiter":this.uploadForm.get('delimiter')?.value,
      "headerTag":'',
      "nestedTag":'',
      "rrrCommonDtls":{
        "dateIns":this.appServiceService.getCurrentDateTime(),
      },
      "mappings":new Array()
    }
    for(let data of this.formatDataDtls.mappings){
      let mappingsConfig=new MappingsConfig();
      mappingsConfig.seqId=data.seqId;
      mappingsConfig.col=data.col;
      mappingsConfig.datatype=data.datatype;
      mappingsConfig.datasize=data.datasize;
      mappingsConfig.tabcol=data.tabcol;
      mappingsConfig.defaultvalue=data.defaultvalue;
      formatData.mappings.push(mappingsConfig);
    }
      
      console.log(JSON.stringify(formatData));
      this.fileFormatService.createFormat(formatData,this.postUrl+'formats').subscribe(data=>{
        console.log(data);
        this.tostService.success(data.responseMessage);
      });
    }
  }
  
  isSelectedDelimiter:boolean=false;
  changedDelimiter(){
    let delimiter=this.uploadForm.get('delimiter')?.value;
    console.log(delimiter);
    if(delimiter !=''){
      this.isSelectedDelimiter=true;
    }else{
      this.tostService.error('please select delimiter');
      this.isSelectedDelimiter=false;
    }
  }
  
  rrrCommonDtls:RrrCommonDtls=new RrrCommonDtls()
  openFormatView(content:any) {
    this.formatList.length=0;
    this.fileFormatService.getFormatList().subscribe(data=>{
      console.log('data-->'+JSON.stringify(data));
        
      for(let d of data){
        let format:ConfigData=new ConfigData();
        format.configId=d.configId;
        format.tablename=d.tablename;
        format.formatname=d.formatname;
        format.desc=d.desc;
        format.fileExt=d.fileExt;
        format.colCount=d.colCount;
        format.delimiter=d.delimiter;
        format.headerTag=d.headerTag;
        format.nestedTag=d.nestedTag;
        format.flag=d.flag;
        format.rrrCommonDtls.companyId=d.rrrCommonDtls.companyId;
        format.rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
        format.rrrCommonDtls.userIns=d.rrrCommonDtls.userIns;
        
        // for(let map of d.mappings){
        //   console.log('configformat-->'+JSON.stringify(map));
        //   let data:MappingsData =new MappingsData(map.seqId,map.col,
        //     map.tabcol,map.dateIns,map.datatype,map.datasize,map.defaultvalue
        //     );
        //     data.siNo=map.siNo;
        //   format.mappings.push(data);
        // }
        this.formatList.push(format);  
        
      }
    });
    this.modalService.open(content, {size: 'xl',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  viewFlage:boolean=false;
  editFlag:boolean=false;
  downloadConfigId:number=0;

  viewFormatDtls(format:ConfigData){
    console.log(format);
    this.fileFormatService.getFormatMapData(format.configId,format.rrrCommonDtls.companyId).subscribe(data=>{
      console.log(data);
     this.formatDataDtls.mappings=data;
     for(let x of this.formatDataDtls.mappings){
        if(x.defaultvalue=='Y'){
          x.isSelected=true;
        }else{
          x.isSelected=false;
        }
     }
    });
    console.log('format-->'+JSON.stringify(format));
    this.tableConfig.get('tableName')?.setValue(format.tablename);
    this.tableConfig.get('fileDecription')?.setValue(format.desc);
    this.tableConfig.get('formatName')?.setValue(format.formatname);
    //this.formatDataDtls.mappings=format.mappings; 
    this.configDtls=format; 
    if(format.flag) {
      this.editFlag=true; 
      this.viewFlage=false; 
      console.log('enabling table config');
     // this.tableupdate.get('datasize')?.setValue('hh')
      this.tableConfig.enable();
    }
    else{
      this.editFlag=false;
      this.viewFlage=true;
      this.tableConfig.disable();
    }
    this.modalService.dismissAll();
    this.downloadConfigId=format.configId;
  }
  download(){
    if(this.downloadConfigId>0){
      this.fileFormatService.downloadFormatData(this.downloadConfigId).subscribe(data=>{
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

  
  updateFormat(){    
    this.configDtls.tablename=this.tableConfig.get('tableName')?.value;
    this.configDtls.desc=this.tableConfig.get('fileDecription')?.value;
    this.configDtls.formatname=this.tableConfig.get('formatName')?.value;
    this.configDtls.mappings=this.formatDataDtls.mappings;
    console.log('data-->'+JSON.stringify(this.configDtls));
    console.log('return-->'+this.updateCheck(this.configDtls));
    if(this.updateCheck(this.configDtls)){
      console.log('data update');
      this.fileFormatService.updateFormat(this.configDtls).subscribe((data:any)=>{
        this.tostService.success(data.responseMessage);
      });
    }
  }

  updateCheck(configDtls:ConfigData):boolean{
    if(!this.appServiceService.keywords.includes(this.configDtls.tablename)){
      if(!this.appServiceService.keywords.includes(this.configDtls.formatname)){
          console.log('123')
        for(let length=0;length<this.configDtls.mappings.length;length++){
          if(this.configDtls.mappings[length].datatype=='VARCHAR' &&
            (this.configDtls.mappings[length].datasize<=0 ||this.configDtls.mappings[length].datasize>=4000)){
            this.tostService.error('Incorrect datatype size for column '+this.formatDataDtls.mappings[length].col+' , Value range 1 to 4000');
            return false;
          }
          if(this.appServiceService.keywords.includes(this.configDtls.mappings[length].tabcol)){
            this.tostService.error('Reserved keyword used for column name '+this.configDtls.mappings[length].tabcol);
           return false;
        }
        }
        console.log('file type-->'+this.uploadFileType);
        if(this.configDtls.fileExt=='csv'){
          if(this.configDtls.delimiter==''){
            this.tostService.error('Please select delimiter');
            return false;
          }
        }
        return true;
      }else{
        this.tostService.error('format name is reserved');
        return false;
      }
    }else{
      this.tostService.error('table name is reserved keyword');
      return false;
    }
  }
  deleteFormat(){
    if(this.downloadConfigId>0){
      this.fileFormatService.deleteFormat(this.downloadConfigId).subscribe((data:any)=>{
        console.log('data-->'+JSON.stringify(data));
        this.tostService.success(data.responseMessage);
      });
    }
  }
  fileFormatScreen(){
    console.log('move')
    window.location.reload();
  }
}
