import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, NgForm} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserServiceService } from '../user-service.service';
import { User, UserAuth } from 'src/app/modules/user/model/User';
const companyId = 1;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    if(new UserAuth().isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  public currentUser?: User;
  user?: string;
  password?: string;
  tokenInfo?: string;
  browser: boolean = true;
  userLogin:FormGroup;
  constructor(private router: Router,
      private userService: UserServiceService,
      private route: ActivatedRoute,
      private toastr: ToastrService,private formBuilder:FormBuilder,
      private http: HttpClient,
      private tostr:ToastrService) { 
          this.userLogin=formBuilder.group({
            loginUsername:new FormControl(),
            loginPassword:new FormControl()
          });
       }


  onSubmit() {
          if ( this.userLogin.status=='VALID') {
              const user = {
                  name: this.userLogin.value.loginUsername,
                  password: this.userLogin.value.loginPassword,
                  companyId: companyId
              };
              this.userService.login(user).then((res: any) => {
                //this.blockUI1.stop();
                console.log("AccessToken::", res);
               // this.cookieService.set("access_token", res.access_token);
                if (res) {
                 // this.loginService.getUserId(data).then((res: any) => {
                    console.log("ParentID ::", res);
                    this.router.navigate(["/"])
                } else {
                  console.log("ERROR", res.status);
                }
              },
              (error: any) => {
                console.log("error", error);
              }
            );

          } else {
              this.toastr.error('Please Enter User Name/Password');
          }
  }
  // On Forgot password link click
  onForgotPassword() {
      this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
      this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  onCompanySignup(){
      this.router.navigate(['../pages/company-signup']);
  }
}
