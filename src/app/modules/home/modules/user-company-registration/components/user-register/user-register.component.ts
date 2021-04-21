import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nameValidation} from 'src/app/validation-share/validation.directive';
import { UserCompanyRoleService } from '../../service&routing/user-company-role.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userRegistration:FormGroup;
  constructor(private formBuilder:FormBuilder,private tostService:ToastrService,
    private datePipe: DatePipe,private registrationService:UserCompanyRoleService,
    private activatedRoute:ActivatedRoute) { 
    this.userRegistration=formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25),
        nameValidation()]],
      lastName:new FormControl(),
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(25),
      Validators.email]],
      selectCountryCode:['',Validators.required],
      contactNumber:['',[Validators.required,Validators.minLength(7)]],
      selectCompany:['',Validators.required],
      selectUserRole:['',Validators.required],
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    })
  }
  today=new Date();
  
  clientList=[
    {
      "clientId":1,
      "clientName":"client 1",
      "selectedClient":false
    },
    {
      "clientId":2,
      "clientName":"client 2",
      "selectedClient":false
    }
  ];
  // public selectedCheck(e:any){
  //   console.log('selected '+data);
  // }
  public firstNameValidation(event:any){
    //first name validation
    let notAllowedCharacter=this.userRegistration.get('firstName')?.hasError('NotAllowedCharacter');
    let firstCharDigit=this.userRegistration.get('firstName')?.hasError('NotStartWithDigit');
    let requiredData=this.userRegistration.get('firstName')?.hasError('required');
    let minLengthError=this.userRegistration.get('firstName')?.hasError('minlength');
    let maxLengthError=this.userRegistration.get('firstName')?.hasError('maxlength');
    
    if(notAllowedCharacter){
      this.tostService.error("Invalid character used in first name");
    }else if(firstCharDigit){
      this.tostService.error("First name should not start with digit ");
    }else if(requiredData){
      this.tostService.error('First name is required')
    }else if(minLengthError){
      this.tostService.error('First name is too short')
    }else if(maxLengthError){
      this.tostService.error('First name is too long')
    }
    
  }
  public usernameValidation(event:any){

    //username validation
    let requiredData=this.userRegistration.get('username')?.hasError('required');
    let minLengthError=this.userRegistration.get('username')?.hasError('minlength');
    let maxLengthError=this.userRegistration.get('username')?.hasError('maxlength');
    if(requiredData){
      this.tostService.error('Username is required')
    }else if(minLengthError){
      this.tostService.error('Username is too short')
    }else if(maxLengthError){
      this.tostService.error('username is too long')
    }
  }
  public emailEvent(event:any){
    let emailError=this.userRegistration.get('email')?.hasError('email');
    console.log("----"+emailError);
    
  }
  public emailValidation(event:any){

    
    //username validation
    let emailError=this.userRegistration.get('email')?.hasError('email');
    
    let requiredData=this.userRegistration.get('email')?.hasError('required');
    let minLengthError=this.userRegistration.get('username')?.hasError('minlength');
    let maxLengthError=this.userRegistration.get('username')?.hasError('maxlength');
    if(emailError){
      this.tostService.error("Please enter valid email");
    }else if(requiredData){
      this.tostService.error('email id is required')
    }else if(minLengthError){
      this.tostService.error('email id is too short')
    }else if(maxLengthError){
      this.tostService.error('email id is too long')
    }
    
  }
  public companyValidation(event:any){
    let requiredData=this.userRegistration.get('selectCompany')?.hasError('required');
   if(requiredData){
     this.tostService.error('Please Select company');
   }
  }
  public startDateValidation(event:any){
    let startDateError=this.userRegistration.get('startDate')?.hasError('required');
    let startDate=this.userRegistration.get('startDate')
    console.log('start--'+typeof(startDate))
    if(startDateError){
      this.tostService.error('start date required')
    }
  }
  public endDateValidation(event:any){
    let endDateError=this.userRegistration.get('endDate')?.hasError('required');
    if(endDateError){
      this.tostService.error('End date required');
    }
  }
  userRegistrationDtls={
    "firstName":"",
    "lastName":"",
    "username":"",
    "email":"",
    "selectCountryCode":"",
    "contactNumber":"",
    "selectUserRole":"",
    "startDate":"",
    "endDate":"",
    "rrrCommonDtls":{
      "dateIns":"",
      "companyId":""
    }
  }
  public userRegistrationData(){
    let currentDate=this.datePipe.transform(new Date(),'yyyy-MM-dd');
    let startDate=this.userRegistration.value.startDate;
    let endDate=this.userRegistration.value.endDate;
    if(endDate !=null && startDate !=null && currentDate !=null ){
      console.log('compare');
      console.log(currentDate<=startDate && startDate<=endDate);
      if(currentDate<=startDate && startDate<=endDate){
        this.userRegistrationDtls.firstName=this.userRegistration.value.firstName;
        this.userRegistrationDtls.lastName=this.userRegistration.value.lastName;
        this.userRegistrationDtls.username=this.userRegistration.value.username;
        this.userRegistrationDtls.email=this.userRegistration.value.email;
        this.userRegistrationDtls.selectCountryCode=this.userRegistration.value.selectCountryCode;
        this.userRegistrationDtls.contactNumber=this.userRegistration.value.contactNumber;
        this.userRegistrationDtls.rrrCommonDtls.companyId=this.userRegistration.value.firstName.selectCompany;
        this.userRegistrationDtls.selectUserRole=this.userRegistration.value.selectUserRole;
        this.userRegistrationDtls.startDate=this.userRegistration.value.startDate;
        this.userRegistrationDtls.endDate=this.userRegistration.value.endDate;
        this.userRegistrationDtls.rrrCommonDtls.dateIns=this.registrationService.getCurrentDateTime();
        
        console.log(JSON.stringify(this.clientList)+'----->userRegistration--->'+JSON.stringify(this.userRegistrationDtls));
        this.registrationService.userRegistration(this.userRegistrationDtls).subscribe(data=>{
          console.log('user result data'+JSON.stringify(data));
        });
      }else{
        this.tostService.error('Please check validity date');
      }
    }
   
  }
  companyList:Array<any>=new Array();
  userRoleList:Array<any>=new Array();
    ngOnInit(): void {
      this.companyList=this.activatedRoute.snapshot.data.data.companyList;
      this.userRoleList=this.activatedRoute.snapshot.data.data.roleList;
     console.log(JSON.stringify(this.companyList));
  }

}