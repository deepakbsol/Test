import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import {User,UserAuth } from 'src/app/modules/user/model/User';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  token: any;
  userInfo: any;
  tokenInfo: any;
  authURL: string = environment.token_api + "oauth/token";

  private userAuthenticated?: boolean;
  private userAuth:UserAuth=new UserAuth();
  constructor(
    private http: HttpClient, private toastr: ToastrService
    ) {
  }

  signupUser(email: string, password: string) {
    // your code for signing up the new user
  }

  login(userData:any): Promise<boolean> {
    console.log('hello');
    return new Promise(resolve => {
      let params = new URLSearchParams();
      params.append('username', userData.name);
      params.append('password', userData.password);
      params.append('grant_type', 'password');
      params.append('client', environment.client_id);

      let headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa(environment.client_id + ":" + environment.client_secret) });
      this.http.post(this.authURL, params.toString(), { headers: headers })
        .subscribe(
          (data:any) => {
            console.log(data);
            this.userAuth.setToken(data.access_token)
           //localStorage.setItem('access_token',data.access_token);
            this.userAuthenticated = true;
           // this.toastr.success("Getting the logedin user details");
            this.http.get<any>(environment.resource_server + `currentuser`)
              .subscribe(
                usrDtls => {
                  console.log('usrDtls--'+JSON.stringify(usrDtls))
                 this.userAuth.saveLogedinUser(new User(usrDtls.username,usrDtls.authority,
                  usrDtls.firstName,
                  usrDtls.lastName,usrDtls.email,usrDtls.companyId,usrDtls.createdBy ));
                  // localStorage.setItem('userDtls',JSON.stringify(usrDtls))
                  resolve(true);
                },
                err => {
                  this.toastr.error("Feacing probelm while getting the user information from resource server")
                  resolve(false);
                }
              )

          },
          err => {
            if (err.status === 0) {
              this.toastr.error("Please enter valid username and password");
            } else {
              this.userAuthenticated = false;
              resolve(false);
            }
          }
        );
    });

  }

  authUser(): any {
    this.tokenInfo = {
      "access_token": this.token.access_token,
      "token_type": this.token.token_type,
      "refresh_token": this.token.refresh_token,
      "expires_in": this.token.expires_in,
      "scope": this.token.scope,
    }
    return this.tokenInfo;
  }
  
}
