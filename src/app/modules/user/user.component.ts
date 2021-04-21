import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from './model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router:Router) { }
  
  ngOnInit(): void {
    if(new UserAuth().isAuthenticated()){
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/user/login'])
    }
  }

}
