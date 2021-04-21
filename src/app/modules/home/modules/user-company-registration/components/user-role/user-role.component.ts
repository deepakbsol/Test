import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nameValidation } from 'src/app/validation-share/validation.directive';
import { UserCompanyRoleService } from '../../service&routing/user-company-role.service';
export class SelectedHubModule{
  hubId:number;
  moduleId:number;
  constructor(hubId:number,moduleId:number){
    this.hubId=hubId;
    this.moduleId=moduleId
  }
}

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  
  orgRoleData:any;
  copyOriginalData:any;
  selectedTableId:number[];
  selectedModuleId:SelectedHubModule[];
  userRole:FormGroup;
  dataArray:any;
  moduleData:any;
  roleName:string='';
  isAllModuleSelected:boolean=false;
  isValidRoleName:boolean=false;
  constructor(private formBuilder:FormBuilder,private tostService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private userCompanyRoleService:UserCompanyRoleService,private datePipe:DatePipe) { 
    this.userRole=this.formBuilder.group({
      rolename:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25),nameValidation()]],
      checkbox:new FormControl()
    });

    this.selectedTableId=new Array<number>();
    this.selectedModuleId=new Array<SelectedHubModule>();
  }
  ngOnInit(): void {
    this.orgRoleData=this.activatedRoute.snapshot.data;
     this.copyOriginalData=JSON.parse(JSON.stringify(this.orgRoleData));
    //console.log("data---------------->"+JSON.stringify(this.orgRoleData));
    this.moduleData= this.copyOriginalData.data.rrrHubList;
    //console.log('hub data-->'+JSON.stringify(this.moduleData));
    this.dataArray=this.copyOriginalData.data.rrrCoreTable;
   //console.log("core table------>"+JSON.stringify(this.dataArray));
   //console.log(JSON.stringify(this.selectedModuleId));
  }

  
  getselectedHubId(e:any,id:number){
    //if user selecting any hub then all module inside that should be selected
    for(let hub of this.moduleData){
      if( hub.selectedHub){
        if(hub.id==id){
        for(let module of hub.rrrModuleList){
          module.selectedModule=true;
        }
      }
      }else{
        for(let module of hub.rrrModuleList){
          module.selectedModule=false;
        }
      }
    }
   }
  
  getselectedModuleId(e:any,moduleId:number,hubId:number){

    for(let hub of this.moduleData){
      if(hub.id==hubId){
        for(let module of hub.rrrModuleList){
          if(module.selectedModule){
            hub.selectedHub=true;
          }else{
            hub.selectedHub=false;
            break;
          }
        }
      }
     
    }
  }
  public getselectedCoreTableId(e:any,id:number){
    if(e.target.checked){
      this.selectedTableId.push(id);
    }else{
      this.selectedTableId=this.selectedTableId.filter(m=>m!=id);
    }
    
  }
  public roleNameValidation(event:any,roleName:string){
    let firstChar=roleName.charAt(0);
    if( firstChar=='0'|| firstChar=='1'||firstChar=='2'||firstChar=='3'||firstChar=='4'||firstChar=='5'
        ||firstChar=='6'||firstChar=='7'||firstChar=='8'||firstChar=='9'){
          this.isValidRoleName=false;
          this.tostService.error('Role name should not start with digit');
    }else if(roleName.includes('_')||roleName.includes('$')||roleName.includes('#')||roleName.includes('@')||roleName.includes('%')||roleName.includes('^')||roleName.includes('&')||roleName.includes('*')){
          this.tostService.error('Invalid character used in role name');
          this.isValidRoleName=false;
    }else if(roleName.length<3){
        this.tostService.error('Role name is too short');
        this.isValidRoleName=false;
    }else if(roleName.length>25){
        this.tostService.error('Role name is too long');
        this.isValidRoleName=false;
    }else{
        this.isValidRoleName=true;
    }
  }
  public userRoleCreate(){
    
    //getting only selected core table dtls
    for(let length=0;length<this.moduleData.length;length++){
      let hubDtls=this.moduleData[length];
      if(hubDtls.selectedHub){
        console.log('selected');
      }else{
        let count=0;
        for(let moduleSize=0;moduleSize<hubDtls.rrrModuleList.length;moduleSize++){
          let module=hubDtls.rrrModuleList[moduleSize];
          if(module.selectedModule){
            count++;
          }else{
            this.moduleData[length].rrrModuleList.splice(moduleSize,1)
            moduleSize=moduleSize-1;
          }
        }
        if(count==0){
        this.moduleData.splice(length,1);
        length=length-1;
        }
      }

     // console.log('insert--->'+JSON.stringify(selectedHubAndModuleList));
    }
    for(let length=0;length<this.dataArray.length;length++){
      if(!this.dataArray[length].tableSelected){
        this.dataArray.splice(length,1)
        length--;
      }
     
    }
    let currentDate=this.datePipe.transform(new Date(),'yyyy-MM-ddThh:mm:ss')
    this.copyOriginalData.data.roleName=this.roleName;
    delete this.copyOriginalData.data['roleId']
    this.copyOriginalData.data.rrrCommonDtls.dateIns=currentDate;
    for(let hub of this.copyOriginalData.data.rrrHubList){
      delete hub['seqNo'];
      hub.rrrCommonDtls.dateIns=currentDate;
      for(let module of hub.rrrModuleList){
        delete module['seqNo'];
        module.rrrCommonDtls.dateIns=currentDate;
      }
    }
    for(let table of this.copyOriginalData.data.rrrCoreTable){
      delete table['seqNo'];
      table.rrrCommonDtls.dateIns=currentDate;
    }
    
     //api call to save the data in data base
     this.userCompanyRoleService.saveUserRole(this.copyOriginalData.data).subscribe(data=>{
      if(data.responseMessage=='DuplicateRole'){
        this.tostService.error('This role already exist');
      }else if(data.responseMessage=='success'){
        this.tostService.success('user role created')
      }else if(data.responseMessage=='exceptionWhileSavingTheUserRole'){
        this.tostService.error('Exception while saving the data');
      }
    });
    this.ngOnInit()
  }

}
