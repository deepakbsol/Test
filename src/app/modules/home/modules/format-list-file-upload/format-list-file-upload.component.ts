import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-list-file-upload',
  templateUrl: './format-list-file-upload.component.html',
  styleUrls: ['./format-list-file-upload.component.scss']
})
export class FormatListFileUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('componentName','format list & file upload');
  }

}
