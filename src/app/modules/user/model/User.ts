export class User {
  private firstName:string;
  private lastName:string;
  private email:string;
  private companyId:string;
  private createdBy:string
  private username:string;
  private authority : string[];
  constructor( username:string,
     authority : string[],
     firstName:string,
     lastName:string,
     email:string,
     companyId:string,
     createdBy:string
    ){
      this.username=username;
      this.authority=authority;
      this.firstName=firstName;
      this.lastName=lastName;
      this.companyId=companyId;
      this.createdBy=createdBy;
      this.email=email;

  }
  public getUsername():String{
    return this.username;
  }
  public getAuthority():any{
    return this.authority;
  }
  public getFirstName():string{
    return this.firstName;
  }
  public getLastName():string{
    return this.lastName;
  }
  public getCompanyId():string{
    return this.companyId;
  }
  public getCreatedBy():string{
    return this.createdBy;
  }
}
export class UserAuth{
  private loginUser?:any
  public logout():void {
       localStorage.clear();
       sessionStorage.clear();
  }
  public  setToken(token:string):void{
      localStorage.setItem('accessToken',token);
  }
  public getToken():any{
      return localStorage.getItem('accessToken');
  }
  public isAuthenticated():boolean{
     return localStorage.getItem('accessToken') !=null ?true:false;
  }
  public saveLogedinUser(user:User):void{
      localStorage.setItem('userDtls',JSON.stringify(user));
  }
  public getLogedinUser():any{
      this.loginUser=localStorage.getItem('userDtls');
      return JSON.parse(this.loginUser);
  }
}
