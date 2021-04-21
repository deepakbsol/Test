import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from 'src/app/modules/user/model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
   public componentName:any;
  ngOnInit(): void {
    this.componentName=localStorage.getItem('componentName');
  }
  public logout(){
    console.log('logout');
    new UserAuth().logout();
    this.router.navigate(['/user/login']);
  }

}
