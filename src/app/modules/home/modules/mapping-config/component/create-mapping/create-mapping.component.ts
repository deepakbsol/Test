import { ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { ColumnMappingDtls, ColumnsDtls, CoreTable, CoreTableColumns, MappingOutput, Tables } from '../../model/mappingOutput';
import { MappingConfigService } from '../../service&route/mapping-config.service';
import {MatStepper} from '@angular/material/stepper';
import { ANY_STATE } from '@angular/animation/src/dsl/animation_transition_expr';
import { RrrCommonDtls } from '../../../file-format/model/file-format-model';

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
  //firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;
  
  constructor(private activatedRoute:ActivatedRoute,
    private tostService:ToastrService ,
    private modalService:NgbModal,
    private router:Router,
    private appServiceService:AppServiceService,
    private mappingConfigService:MappingConfigService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
    ) {
    
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
  backupCoreAndDestTables:Array<CoreTableColumns>=new Array<CoreTableColumns>();
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

  addSelectedTablesData(){
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
      coreTable.rrrCoreTableColDtls.push(coreTableColumn);
    }    
    this.mappingOutput.coreTable=coreTable;
    this.mappingOutput.mappingName=this.mappingName;
    this.mappingOutput.startDate=this.startDate;
    this.mappingOutput.endDate=this.endDate;
  }
  }
  this.backupCoreAndDestTables.length=0;
  this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
    
  }
  stapOnePopUp(content:any){
    this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  columnMappingDtlsList:Array<ColumnMappingDtls>=new Array<ColumnMappingDtls>();
  
  proceed(){
    //save mapping data in tables
    
    //setting the destination table id
    this.mappingOutput.destTableId=this.mappingOutput.coreTable.tableId;
    //adding sellected tables 
    this.addSelectedTablesData();
    //setting username and companyid
    this.mappingOutput.mode='save';
    let x=JSON.parse(localStorage.getItem('userDtls')||'{}');
    console.log('json data-->'+x);
    let rrrCommonDtls=new RrrCommonDtls();
    rrrCommonDtls.companyId=x.rrrCommonDtls.companyId;
    rrrCommonDtls.userIns=x.rrrCommonDtls.userIns;
    rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
    this.mappingOutput.rrrCommonDtls=rrrCommonDtls;
    for(let x of this.mappingOutput.sourceTable){
      x.rrrCommonDtls=rrrCommonDtls;
    }
    this.mappingOutput.relation='';
    this.columnMappingDtlsList.length=0;

    console.log('mapping data-->'+JSON.stringify(this.mappingOutput));
   
   //saving data in data base
   //calling api
   this.mappingConfigService.creatingMapping(this.mappingOutput).subscribe(data=>{
    console.log('proced-->'+JSON.stringify(data));
    if(data){
      this.tostService.success(data.message);
      this.mappingOutput.mappingId=data.mappingId;
      this.matStapper.selectedIndex=1;
    }else{
      this.tostService.error('mapping name already exists');
    }
    },(error)=>{
    this.tostService.error('error while saving mapping');
    });
    //check unique mapping name
    // this.mappingConfigService.checkMappingName(this.mappingOutput).subscribe(data=>{
    //   if(!data.result){
    //     this.mappingOutput.relation='';
    //     this.mapping.clear();
    //     this.addSelectedTablesData();
    //     //taking backup of the selected core table columns
    //     this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
    //     this.matStapper.selectedIndex=1;
    //   }else if(data.result){
    //     this.tostService.error('error');
    //   }
    // },(err)=>{
    //   this.tostService.error('Error occore while checking Mapping Name');
    // });
    this.modalService.dismissAll();
  }
  stapeOneValidation(content:any,stapper:MatStepper){
    this.matStapper=stapper;
    console.log('backup data-->'+JSON.stringify(this.backupCoreAndDestTables));
    this.mappingOutput.mappingName=this.mappingName;
    //how many source tables are selected 
    var count=0;
    for(let item of this.soureceTableList){
      if(item.tableSelected){
        count++;
      }
    }
    console.log('selected source table-->'+count);
    console.log('old -->'+this.mappingOutput.sourceTable.length);
    if(this.mappingOutput.sourceTable.length==0){
      this.addSelectedTablesData();
       //taking backup of the selected core table columns
      //  this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
      //  console.log('1 backup-->'+JSON.stringify(this.backupCoreAndDestTables));
      
       //check unique mapping name
       this.mappingConfigService.checkMappingName(this.mappingOutput).subscribe(data=>{
        console.log('res->'+data.result);
        console.log('data-->'+JSON.stringify(data));
        if(!data.result){
          this.tostService.success('mapping name check-->'+data.result);
          //taking backup of the selected core table columns
          //this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
          //console.log('2 backup-->'+JSON.stringify(this.backupCoreAndDestTables));
          
          this.matStapper.selectedIndex=1;
        }else{
          this.tostService.error('given mapping name already exist');
        }
      },(err)=>{
        this.tostService.error('Error occore while checking Mapping Name');
      });
    }else if(count!=this.mappingOutput.sourceTable.length || this.mappingOutput.coreTable.tableId !=this.selectedCoreTable.tableId){
      //this.tostService.success('show pop up and insert if clicked on proced 111');
      //this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
      this.stapOnePopUp(content);
    }else{
      for(var item of this.soureceTableList){
        if(item.tableSelected){
           var id=item.configId;
          //  this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
          //  console.log('3 backup-->'+JSON.stringify(this.backupCoreAndDestTables));
      
            if(!this.mappingOutput.sourceTable.some(source=>source.configId===id)){
              //this.tostService.success('show pop up and insert if clicked on proced 222');
              this.stapOnePopUp(content);
            }else{
              this.mappingConfigService.checkMappingName(this.mappingOutput).subscribe(data=>{
                if(!data.result){
                  this.matStapper.selectedIndex=1;
                }else{
                  this.tostService.error('Duplicate mapping name')
                }
              },(err)=>{
                this.tostService.error('error while checking mapping name');
              });
            }
        }
      }
       //check unique mapping name
      //  this.mappingConfigService.checkMappingName(this.mappingOutput).subscribe(data=>{
      //   if(!data.result){
      //     //taking backup of the selected core table columns
      //     this.mappingOutput.coreTable.rrrCoreTableColDtls.forEach((column: CoreTableColumns) => this.backupCoreAndDestTables.push(Object.assign({}, column)));
      //     this.matStapper.selectedIndex=1;
      //   }else if(data.result){
      //     this.tostService.error('mapping name already exists');
      //   }
      // },(err)=>{
      //   this.tostService.error('Error occore while checking Mapping Name');
      // });
    }
  }
 
  switch:boolean=false;
  targetType:string='target column';
  changeTargetType(){
    this.tableId2==0;
    this.targetValue='';
    this.columnId2=0;
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
  // changeSelectedSourceColumn1(){
  //   console.log('column id->'+this.columnId1);
  //   for(let col of this.selectedSourceTable1.columns){
  //     if(col.seqId==this.columnId1){
  //       console.log('column-->'+JSON.stringify(col));
  //     }
  //   }
  // }

  changeSelectedSourceTable1(){
    for(let table of this.mappingOutput.sourceTable){
      if(table.configId==this.tableId1){
        this.selectedSourceTable1=table;
      }
    }
    console.log('source table-->'+JSON.stringify(this.selectedSourceTable1));
  }

  tableId2:number=0;
  columnId2:number=0;
  selectedSourceTable2:Tables=new Tables();
  // changeSelectedSourceColumn2(){
  //   console.log('column id->'+this.columnId1);
  //   for(let col of this.selectedSourceTable2.columns){
  //     if(col.seqId==this.columnId2){
  //       console.log('column-->'+JSON.stringify(col));
  //     }
  //   }
  // }

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
  targetValue:any;  

  clearSelectedTableAndColumn(){
    this.selectedSourceTable2=new Tables();
    this.selectedSourceTable1=new Tables();
    this.tableId1=0;
    this.tableId2=0;
    this.columnId1=0;
    this.columnId2=0;
    this.selectedOperator='';
    this.targetValue='';
  }
  connector:string='';
  
  makeRelation(connector:string){
    console.log('connector  '+connector);
    //first time it will be empty from second time onwards first connector will be added then relation will concat
    this.mappingOutput.relation=this.mappingOutput.relation+connector+' ';
    //concat first table name
    this.mappingOutput.relation=this.mappingOutput.relation+this.selectedSourceTable1.tablename+'.';
    //concat first selected column name
    for(let col of this.selectedSourceTable1.columns){
      if(col.seqId==this.columnId1){
        this.mappingOutput.relation=this.mappingOutput.relation+col.tabcol+' '
      }
    }
    //adding relation between selected columns
    this.mappingOutput.relation=this.mappingOutput.relation+this.selectedOperator+' '
    //concat second table name
    if(this.selectedSourceTable2.tablename){
      console.log('second table selected');
    this.mappingOutput.relation=this.mappingOutput.relation+this.selectedSourceTable2.tablename+'.';
    //concat first selected column name
    for(let col of this.selectedSourceTable2.columns){
      if(col.seqId==this.columnId2){
        this.mappingOutput.relation=this.mappingOutput.relation+col.tabcol+' '
      }
    }
  }else{
    this.mappingOutput.relation=this.mappingOutput.relation+this.targetValue+' ';
  }
    console.log('relation--'+this.mappingOutput.relation);
    this.clearSelectedTableAndColumn();
    this.connector="AND";
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
  matStapper!: MatStepper;
  mappingRelationConfirmation(content:any,stapper:MatStepper){
      this.matStapper=stapper;
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
  userConformed(userChoise:string){
    console.log(userChoise);
    this.modalService.dismissAll();
    if(userChoise=='yes'){
      this.stapeTwoValidation();
    }
  }
  stapeTwoValidation(){
    //clear all the selected tables and columns
    this.clearSelectedTableAndColumn();
    //check the made relation between tables
    this.mappingConfigService.checkRelation(this.mappingOutput).subscribe(data=>{
      console.log('data-->'+JSON.stringify(data));
      if(data.result){
        this.tostService.success('validation passed')
        this.matStapper.selectedIndex=2;
      }else{
        this.tostService.error('Incorrect relation formula')
      }
    },(err)=>{
      this.tostService.error('Incorrect relation formula');
    });
  }
  isDragMode:boolean=true;
  modeType:string='drag mode';
  changeModeType(){
    if(this.isDragMode){
      this.modeType='drag mode';
    }else{
      this.modeType='custome mode';
    }
  }


  // drop(ev:any) {
  //   console.log('1');
  //   ev.preventDefault();
  //   console.log('2');
  //   console.log(ev.target.value);
  //   var data = ev.dataTransfer.getData("dropData");
  //   console.log('3-->'+data);
  //   ev.target.appendChild(document.getElementById('dropData'));
  //   console.log('4');
  // }


  //mapping started
  mappingCoreCol:string='';
  mappingSourceCol:string='';
  isEnableDragBox:boolean=false;
  allowDrop(ev:any) {
    console.log('allowed drop');
    ev.preventDefault();
  }

  dragStart(ev:any) {
    this.isEnableDragBox=true;
    console.log('start ->'+ev.target.id);
    //ev.dataTransfer.setData("text", ev.target.id);
  }
  coreTableColSelected:CoreTableColumns=new CoreTableColumns();
  endCoreTableDrag(coreTable:string,col:CoreTableColumns){
    this.isEnableDragBox=false;
    console.log('data-->ended'+coreTable);
    console.log(JSON.stringify(col));
    this.mappingCoreCol=col.columnName;
    this.coreTableColSelected=col;
  } 
  selectedMappingSourceTable:string=''
  sourceTableColSelected:ColumnsDtls=new ColumnsDtls();
  endSourceTableDrag(selectedSourceTable:string,col:ColumnsDtls){
    this.isEnableDragBox=false;
    console.log('source table-->'+selectedSourceTable);
    console.log('col-->'+col);
    this.mappingSourceCol=this.mappingSourceCol.concat(selectedSourceTable+"."+col.tabcol);
    this.selectedMappingSourceTable=selectedSourceTable;
    this.sourceTableColSelected=col;
  }

  mapping:Map<string,string>=new Map<string,string>();

  ViewCreatedMapping(content:any){
    console.log("data-->"+JSON.stringify(this.columnMappingDtlsList));
    this.modalService.open(content, {size: 'xl',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  previewMapping(content:any){
    this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  isMappedColumn=false;
  addMapping(){
     this.mappingOutput.destTableId=this.mappingOutput.coreTable.tableId;
     let col=new ColumnMappingDtls();
     col.destColumn=this.mappingCoreCol;
     col.destType=this.coreTableColSelected.dataType;
     col.mappRule=this.mappingSourceCol;
     //col.mappRule=this.selectedMappingSourceTable+"."+this.sourceTableColSelected.tabcol;
     let x=JSON.parse(localStorage.getItem('userDtls')||'{}');
     console.log('json data-->'+JSON.stringify(col));
     let rrrCommonDtls=new RrrCommonDtls();
     rrrCommonDtls.companyId=x.rrrCommonDtls.companyId;
     rrrCommonDtls.userIns=x.rrrCommonDtls.userIns;
     rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
     col.rrrCommonDtls=rrrCommonDtls;
     this.mappingOutput.columnMappingDtls.push(col);
     this.mappingConfigService.addColMapping(this.mappingOutput).subscribe(
      data=>{
        console.log('data-->>'+data);
        if(data){
          this.mapping.set(this.mappingCoreCol,this.mappingSourceCol)
          this.mappingOutput.coreTable.rrrCoreTableColDtls = this.mappingOutput.coreTable.rrrCoreTableColDtls.filter(
            obj => obj.columnName !== col.destColumn);
          this.tostService.success('added mapping column');
          this.columnMappingDtlsList.push(col);
          console.log('mapping columns-->'+JSON.stringify(this.columnMappingDtlsList));
          //this.mapping.set(this.mappingCoreCol,this.sourceTableColSelected.tabcol);
        }else{
          this.tostService.error('error while adding column');
        }
      },(err)=>{
        this.tostService.error('error while addmin columan mapping');
      });
      console.log('mapping data size-->'+this.mapping.size);

      this.mappingCoreCol='';
      this.mappingSourceCol='';
      this.isMappedColumn=true;
      this.coreTableColSelected=new CoreTableColumns();
      this.sourceTableColSelected=new ColumnsDtls();
      this.mappingOutput.columnMappingDtls.pop();
  }
  clearMapping(){
    this.mappingCoreCol='';
    this.mappingSourceCol='';
  }
  editSourceColumn(col:ColumnMappingDtls){
    console.log('core column '+col);
    this.mappingCoreCol=col.destColumn;
    console.log('mapping core column '+this.mappingCoreCol);
    this.mappingSourceCol=col.mappRule;
    this.mapping.delete(col.destColumn);
    this.columnMappingDtlsList = this.columnMappingDtlsList.filter(
      obj => obj.destColumn !== col.destColumn);
     
  }    
  deleteMapping(col:ColumnMappingDtls){
    console.log(JSON.stringify(this.backupCoreAndDestTables));
    console.log('---------------------------------------------------------------------------------');
    console.log('---------------------------------------------------------------------------------');
    this.mapping.delete(col.destColumn);
    this.columnMappingDtlsList = this.columnMappingDtlsList.filter(
      obj => obj.destColumn !== col.destColumn);
    
    this.backupCoreAndDestTables.forEach((column: CoreTableColumns) => {
      if(column.columnName==col.destColumn){
        this.mappingOutput.coreTable.rrrCoreTableColDtls.push(Object.assign({}, column));
      }
    });    
    this.mappingOutput.coreTable.rrrCoreTableColDtls.sort((a,b)=>(a.columnId>b.columnId)?1:-1);
  }
  
  expression(exp:string){
    if(exp==='case'){
      this.mappingSourceCol=this.mappingSourceCol.concat('CASE [] WHEN <> THEN <> END');
    }else if(exp==='braces'){
      this.mappingSourceCol=this.mappingSourceCol.concat('()');
    }else if(exp==='concat'){
      this.mappingSourceCol=this.mappingSourceCol.concat('CONCAT(column 1 , column 2)');
    }else if(exp==='substring'){
      this.mappingSourceCol=this.mappingSourceCol.concat('SUBSTRING(column ,int beginIndex, int endIndex)');
    }else if(exp==='replace'){
      this.mappingSourceCol=this.mappingSourceCol.concat('REPLACE(column , old character, new character)');
    }else if(exp==='date'){
      this.mappingSourceCol=this.mappingSourceCol.concat(this.appServiceService.getCurrentDateTime());
    }
    console.log('exp-->'+exp);
  }
  operators(ope:string){
    this.mappingSourceCol=this.mappingSourceCol.concat(ope);
    console.log('ope-->'+ope);
  }

  editPreviewSourceColumn(column:ColumnMappingDtls){
    
    this.mappingCoreCol=column.destColumn;
    this.mappingSourceCol=column.mappRule;
    //this.mapping.delete(coreColumn);
    this.columnMappingDtlsList = this.columnMappingDtlsList.filter(
      obj => obj.destColumn !== column.destColumn);
    
    this.matStapper.selectedIndex=2;
  }
  submitMappingData(content:any){
    this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createMappingConformation(confirm:string){
    console.log('confirm-->'+confirm);
    if(confirm==='yes'){
      //inserting all the mapped column names
      this.mappingOutput.columnMappingDtls=this.columnMappingDtlsList;
      this.mappingOutput.mode='create';
      let x=JSON.parse(localStorage.getItem('userDtls')||'{}');
      console.log('json data-->'+x);
      let rrrCommonDtls=new RrrCommonDtls();
      rrrCommonDtls.companyId=x.rrrCommonDtls.companyId;
      rrrCommonDtls.userIns=x.rrrCommonDtls.userIns;
      rrrCommonDtls.dateIns=this.appServiceService.getCurrentDateTime();
      this.mappingOutput.rrrCommonDtls=rrrCommonDtls;
      for(let x of this.mappingOutput.sourceTable){
        x.rrrCommonDtls=rrrCommonDtls;
      }
      //calling api
      console.log(JSON.stringify('create mapping-->'+this.mappingOutput.columnMappingDtls));
      this.mappingConfigService.creatingMapping(this.mappingOutput).subscribe(data=>{
        if(data){
          this.tostService.success(data.message);
          this.router.navigate(['/dataprocess']);   
        }
      },(error)=>{
        this.tostService.error('error while creating mapping');
      });
      //cloasing popup and redirecting to data process tiles
      this.modalService.dismissAll();
    }
  }  

}
