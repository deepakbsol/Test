import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter  } from '@angular/core';
import { AppServiceService } from 'src/app/service&route/app-service.service';

@Component({
  selector: 'app-file-format',
  templateUrl: './file-format.component.html',
  styleUrls: ['./file-format.component.scss']
})
export class FileFormatComponent implements OnInit {
  @Output() moduleChanged: EventEmitter<string> =   new EventEmitter();
 
  constructor(private appServiceService:AppServiceService) { }
  
  ngOnInit(): void {
   
  }

}
