import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { ColumnsDtls, CoreTable, CoreTableColumns, MappingOutput, Tables } from '../../model/mappingOutput';
import { MappingConfigService } from '../../service&route/mapping-config.service';

@Component({
  selector: 'app-create-mapping',
  templateUrl: './create-mapping.component.html',
  styleUrls: ['./create-mapping.component.scss']
})
export class CreateMappingComponent implements OnInit {
  isLinear = false;
  mappingName:string='';
  startDate:string='';
  endDate:string='';
  //firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;

  constructor(private activatedRoute:ActivatedRoute,
    private tostService:ToastrService ,
    private appServiceService:AppServiceService,
    private mappingConfigService:MappingConfigService) {
    
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }
  coreAndDestTables:any;
  coreTableList:any;
  soureceTableList:any;
  coreSearch:string='';
  sourceSearch:string='';
  ngOnInit() {
    this.coreAndDestTables=this.activatedRoute.snapshot.data;
    this.coreTableList=this.coreAndDestTables.data.coreTable;
    this.soureceTableList=this.coreAndDestTables.data.sourceTable;
    console.log('coreTableList-->'+JSON.stringify(this.coreTableList));
    console.log('soureceTableList-->'+JSON.stringify(this.soureceTableList));
  }
  sourceTableSearch(event:any){
    console.log(event.target.value);
  }
  isValidMappingName:boolean=false;
  mappingNameValidation(mappingName:string){
    this.isValidMappingName=false;
    console.log(mappingName);
    const regex = new RegExp('^[a-zA-Z]{1}[a-zA-Z0-9_]*[a-zA-Z0-9]$');
    const valid = regex.test(mappingName);
    if(!valid){
      this.isValidMappingName=false;
      this.tostService.error('Please insert valid mapping name');
    }else{
      this.isValidMappingName=true;
    }
  }
  isValidStartDate=false;
  public startDateValidation():boolean{
    this.isValidStartDate=false;
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    console.log(dte.toString());
    let currentDate=this.appServiceService.getCurrentDateTime();
    console.log('current date-->'+currentDate);
    if(new Date(this.startDate) !=null && new Date(dte) !=null ){
      console.log(new Date(dte)>new Date(this.startDate));
      if(new Date(dte)>new Date(this.startDate)){
        this.tostService.error('Start date should not less then current date');
        this.isValidStartDate=false;
        return false;
      }else if(new Date(this.endDate) !=null && new Date(this.startDate)>new Date(this.endDate)){
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
    if(new Date(this.endDate) !=null && new Date(dte) !=null ){
      console.log(new Date(dte)>new Date(this.startDate));
      if(new Date(dte)>new Date(this.endDate)){
        this.tostService.error('End date should not less then current date');
        this.isValidEndDate=false;
        return false;
      }else if(new Date(this.startDate) !=null && new Date(this.startDate)>new Date(this.endDate)){
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
  isSelectedSourceTable=false;
  isSelectedCoreTable=false;
  mappingOutput=new MappingOutput();
  sourceTableChange(){
    //this.isSelectedCoreTable=false;
    for(var item of this.soureceTableList){
      if(item.tableSelected){
        this.isSelectedSourceTable=true;
      }
  }
  }
  selectedCoreTable:any;
  coreTableChanged(item:any){
    this.isSelectedCoreTable=true;
    this.selectedCoreTable=item;
    console.log('core-->'+JSON.stringify(item));
  }

  stapeOneValidation(){
    this.mappingOutput.sourceTable.length=0;
    for(var item of this.soureceTableList){
      if(item.tableSelected){
    let tables= new Tables();
    for(let map of item.mappings){
      let columnsDtls=new ColumnsDtls();
      columnsDtls.seqId=map.seqId;
      columnsDtls.siNo=map.siNo;
      columnsDtls.col=map.col;
      columnsDtls.datasize=map.datasize;
      columnsDtls.datatype=map.datatype;
      columnsDtls.defaultvalue=map.defaultvalue;
      columnsDtls.tabcol=map.tabcol;
      tables.columns.push(columnsDtls);
    }
    tables.configId=item.configId;
    tables.formatname=item.formatname;
    tables.tablename=item.tablename;
    this.mappingOutput.sourceTable.push(tables);
    //core table details
    let coreTable=new CoreTable();
    coreTable.tableId=this.selectedCoreTable.tableId;
    coreTable.tableName=this.selectedCoreTable.tableName;
    coreTable.totalColumn=this.selectedCoreTable.totalColumn;
    console.log('this.selectedCoreTable-->'+JSON.stringify(this.selectedCoreTable.rrrCoreTableColDtls));
    for(let item of this.selectedCoreTable.rrrCoreTableColDtls){
      let coreTableColumn=new CoreTableColumns();
      coreTableColumn.columnId=item.columnId;
      coreTableColumn.columnName=item.columnName;
      coreTableColumn.dataSize=item.dataSize;
      coreTableColumn.dataType=item.dataType;
      coreTableColumn.nullable=item.nullable;
      coreTable.columns.push(coreTableColumn);
    }
    this.mappingOutput.coreTable=coreTable;
    this.mappingOutput.mappingName=this.mappingName;
  }
  }
    console.log('data-->'+JSON.stringify(this.mappingOutput));
    console.log(this.mappingOutput);
    this.mappingConfigService.checkMappingName(this.mappingOutput).subscribe(data=>{
      if(!data.result){
      }else if(data.result){
        this.tostService.error('error');
      }
    },(err)=>{
      this.tostService.error('Error occore while checking Mapping Name');
    });
  }
 
  switch:boolean=false;
  targetType:string='target column';
  changeTargetType(){
    if(this.switch){
      this.targetType='target value';
    }else{
      this.targetType='target column';
    }
    console.log('type--'+this.switch);
  }

  selectedSourceTable1:Tables=new Tables();
  tableId1:number=0;
  columnId1:number=0;
  selectedSourceColumn1:string='';
  changeSelectedSourceColumn1(){
    console.log('column id->'+this.columnId1);
    for(let col of this.selectedSourceTable1.columns){
      if(col.seqId==this.columnId1){
        console.log('column-->'+JSON.stringify(col));
      }
    }
  }

  changeSelectedSourceTable1(){
    for(let table of this.mappingOutput.sourceTable){
      if(table.configId==this.tableId1){
        this.selectedSourceTable1=table;
      }
    }
  }

  tableId2:number=0;
  columnId2:number=0;
  selectedSourceTable2:Tables=new Tables();
  changeSelectedSourceColumn2(){
    console.log('column id->'+this.columnId1);
    for(let col of this.selectedSourceTable2.columns){
      if(col.seqId==this.columnId2){
        console.log('column-->'+JSON.stringify(col));
      }
    }
  }

  changeSelectedSourceTable2(){
    for(let table of this.mappingOutput.sourceTable){
      if(table.configId==this.tableId2){
        this.selectedSourceTable2=table;
      }
    }
  }

  relations = [

    { id: 0, name: "<" },
    { id: 1, name: ">" },
    { id: 2, name: "=" },
    { id: 3, name: "<=" },
    { id: 4, name: ">=" },
    { id: 5, name: "!=" },
    { id: 6, name: "LIKE" },
    { id: 7, name: "NOT LIKE" },
    { id: 8, name: "EXISTS" },
    { id: 9, name: "NOT EXISTS" }

  ];

  selectedOperator:string='';
  
}
