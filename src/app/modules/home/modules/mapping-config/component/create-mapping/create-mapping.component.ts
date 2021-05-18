import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-mapping',
  templateUrl: './create-mapping.component.html',
  styleUrls: ['./create-mapping.component.scss']
})
export class CreateMappingComponent implements OnInit {

  constructor() { }

  next1(){

    console.log('next ');
    
  }
  prev1(){
    console.log('prev1  ');
    
  }
  ngOnInit(): void {
  }

  saveMapping(){
    
  }

}
