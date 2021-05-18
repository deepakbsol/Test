import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { UserAuth } from '../user/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router,private appServiceService:AppServiceService) { }

  ngOnInit(): void {
  }

  public logout():void{
    new UserAuth().logout();
  }
}
