import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../user/model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    localStorage.setItem('componentName','home')
  }

  public logout():void{
    new UserAuth().logout();
  }
}
