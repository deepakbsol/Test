import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/modules/user/model/User';
import { AppServiceService } from 'src/app/service&route/app-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 
  constructor(private router:Router,private appServiceService:AppServiceService) { }
   public componentName:any;
   //componentName:string=this.appServiceService.moduleChanged;
  ngOnInit(): void {
  }
  public logout(){
    console.log('logout');
    new UserAuth().logout();
    this.router.navigate(['/user/login']);
  }

}
