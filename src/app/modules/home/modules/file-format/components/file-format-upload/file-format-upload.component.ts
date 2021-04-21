import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { environment } from 'src/environments/environment';
import { ConfigData, FormatDataDtls, MappingsData } from '../../model/file-format-model';
import { FileFormatService } from '../../service&routing/file-format.service';
import { ToastrService } from 'ngx-toastr';
import { lengthValidation } from 'src/app/validation-share/file-format.directive';

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
  tableupdate:FormGroup;
  tableColUpdate:FormGroup;
  isVarcharDataType:boolean=false;
  configDtls:ConfigData;
  delimiterList=[',',';','/','^'];
  constructor(private formBuilder: FormBuilder, private appServiceService:AppServiceService,
    private fileFormatService:FileFormatService,private modalService: NgbModal,
    private tostService:ToastrService) { 
      this.mappingsData=new MappingsData(0,'','',0,'','',0,'');
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
    this.tableupdate=this.formBuilder.group({
      selectdataType:[''],
      datatype:['',[Validators.required]],
      datasize:['']
    });
    
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
    
  }
  uploadFileType='';
  postUrl='';
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file')?.setValue(file);
     this.uploadFileType=file.name.substring(file.name.lastIndexOf('.')+1);
     console.log(this.uploadFileType);
    }
  }
 //isFileUploaded:boolean=false;
  onSubmit() {
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
            this.formatDataDtls.mappings.push(new MappingsData(extract.seqId,extract.col,extract.tabcol,extract.configId,
              extract.dateIns,extract.datatype,extract.datasize,extract.defaultvalue));
          }
          console.log(JSON.stringify(this.formatDataDtls.mappings));
          this.isFileUploaded=true;
          this.tableConfig.enable();
        }

      },
      (err) =>{
        console.log(err);
      } 
    );
  }
  tableColumnNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidTableColumn=true; 
    }else{
      this.tostService.error('Given Column Name is reserved keyword');
      this.isValidTableColumn=false;
    }
  }
  isValidTableColumn:boolean=false;
  isValidTabName:boolean=false;
  tableNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidTabName=true; 
    }else{
      this.tostService.error('Given Table Name is reserved keyword');
      this.isValidTabName=false;
    }
    console.log('setting table validation name-->'+this.isValidTabName);
  }
  isValidFormatName:boolean=false;
  formatNameValidation(event:any){
    if(!this.appServiceService.keywords.includes(event.target.value.toUpperCase())){
      this.isValidFormatName=true; 
    }else{
      this.tostService.error('Given Table Name is reserved keyword');
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
    data.datatype=this.tableupdate.get('datatype')?.value;
    if(data.datatype=='VARCHAR'){
      data.datasize=this.tableupdate.get('datasize')?.value;
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
      data.defaultvalue='n';
    }
    if(event.target.checked){
      data.defaultvalue='y';
    }
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==data.seqId){
        this.formatDataDtls.mappings[length]=data;
      }
      }
    console.log('all-->'+JSON.stringify(this.formatDataDtls.mappings));
  }
  dataLength(data:any){
    data.datasize=this.tableupdate.get('datasize')?.value;
    console.log(data.datasize);
    for(let length=0;length<this.formatDataDtls.mappings.length;length++){
      if(this.formatDataDtls.mappings[length].seqId==data.seqId){
        if(data.datasize>0 && data.datasize<4000){
          this.formatDataDtls.mappings[length]=data;
        }else{
           this.tostService.error('Please insert the length between 1 to 4000')
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
          this.tostService.error('please give valid length');
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
      
      this.configDtls.tablename=this.tableConfig.get('tableName')?.value;
      this.configDtls.desc=this.tableConfig.get('fileDecription')?.value;
      
      this.configDtls.formatname=this.tableConfig.get('formatName')?.value;
      this.configDtls.colCount=this.formatDataDtls.mappings.length;
      this.configDtls.fileExt="."+this.uploadFileType;

      this.configDtls.delimiter=this.uploadForm.get('delimiter')?.value;
      this.configDtls.rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
      this.configDtls.mappings=this.formatDataDtls.mappings;
      console.log('data-->'+JSON.stringify(this.formatDataDtls.mappings.length));
      console.log(JSON.stringify(this.configDtls));
      this.fileFormatService.createFormat(this.configDtls,this.postUrl+'formats').subscribe(data=>{
        console.log(data);
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
}