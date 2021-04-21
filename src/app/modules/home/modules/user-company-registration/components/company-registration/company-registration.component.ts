import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { nameValidation} from 'src/app/validation-share/validation.directive';
import { UserCompanyRoleService } from '../../service&routing/user-company-role.service';
@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  companyRegistration:FormGroup;
  constructor(private formBuilder:FormBuilder,private userCompanyRoleService:UserCompanyRoleService,
    private tostService:ToastrService){
    this.companyRegistration=formBuilder.group({
      companyName:['',[Validators.required,Validators.maxLength(25),nameValidation()]],
      email:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25),Validators.email]],
      address:['',[Validators.required,Validators.minLength(3),Validators.maxLength(200)]],
      countryCode:['',[Validators.required,Validators.maxLength(5)]],
      contact:['',[Validators.required,Validators.maxLength(10)]]
    })
  }


  public emailValidation(event:any){
    let requiredError=this.companyRegistration.get('email')?.hasError('required');
    let minLengthError=this.companyRegistration.get('email')?.hasError('minlength');
    let maxLengthError=this.companyRegistration.get('email')?.hasError('maxlength');
    let emailError=this.companyRegistration.get('email')?.hasError('email');
    if(requiredError){
      this.tostService.error('email  is required')
    }else if(minLengthError){
      this.tostService.error('email is too small')
    }else if(maxLengthError){
      this.tostService.error('email is too long');
    }else if(emailError){
      this.tostService.error('Please provide valid email')
    }

  }
  public companyNameValidation(event:any){
    let requiredError=this.companyRegistration.get('companyName')?.hasError('required');
    let minLengthError=this.companyRegistration.get('companyName')?.hasError('minlength');
    let notAllowedChar=this.companyRegistration.get('companyName')?.hasError('NotAllowedCharacter');
    let notStartWithDigit=this.companyRegistration.get('companyName')?.hasError('NotStartWithDigit');
    let maxLengthError=this.companyRegistration.get('companyName')?.hasError('maxlength');
    
    if(requiredError){
      this.tostService.error('Company name is required')
    }else if(minLengthError){
      this.tostService.error('Company name is too small')
    }else if(notAllowedChar){
      this.tostService.error('Not allowed character used in company name')
    }else if(notStartWithDigit){
      this.tostService.error('Company name should not start with digit')
    }else if(maxLengthError){
      this.tostService.error('Company name is too long');
    }

  }
  ngOnInit(): void {
  }
  companyData={
    "companyName":"",
    "email":"",
    "countryCode":"",
    "contact":"",
    "address":"",
    "rrrCommonDtls":{
      "companyId":"",
      "userIns":"",
      "dateIns":""
    }
  }
  public companyRegistrationData(){
    console.log('data--'+JSON.stringify(this.companyRegistration.value.companyName));
    this.companyData.companyName=this.companyRegistration.value.companyName
    this.companyData.email=this.companyRegistration.value.email;
    this.companyData.countryCode=this.companyRegistration.value.countryCode;
    this.companyData.contact=this.companyRegistration.value.contact;
    this.companyData.address=this.companyRegistration.value.address;
    this.companyData.rrrCommonDtls.dateIns=this.userCompanyRoleService.getCurrentDateTime();
    this.userCompanyRoleService.saveCompanyDetails(this.companyData).subscribe(res=>{
      console.log(res);
      if(res.responseMessage=='duplicateCompanyName'){
        this.tostService.error('This company name already exists');
      }else if(res.responseMessage=='duplicateEmail'){
        this.tostService.error('This email address already exists');
      }else if(res.responseMessage=='exceptionWhileSavingCompanyDtls'){
        this.tostService.error('Exception occured while saving the company details')
      }else if(res.responseMessage=='success'){
        this.tostService.success('Added company details');
      }
    });

  }
}
