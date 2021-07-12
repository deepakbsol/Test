import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from 'src/app/modules/home/home.service';
import { MappingOutput } from '../../../mapping-config/model/mappingOutput';
import { DataProcessService } from '../../service&route/data-process.service';

@Component({
  selector: 'app-mapping-process',
  templateUrl: './mapping-process.component.html',
  styleUrls: ['./mapping-process.component.scss']
})
export class MappingProcessComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
    private modalService:NgbModal,
    private dataProcessService:DataProcessService,
    private router:Router,
    private homeService:HomeService
    ) { }
   mappingList:Array<MappingOutput>=new Array<MappingOutput>();
  ngOnInit(): void {
    if(this.homeService.getSellectedMappingList().length>0){
      this.mappingList=this.homeService.getSellectedMappingList();
    }else{
      this.mappingList=this.activatedRoute.snapshot.data.data;
    }
    console.log('data-->'+JSON.stringify(this.mappingList));
  }
  closeResult: string=''; 
  coreTable='';
  selectedMapping:MappingOutput=new MappingOutput();
  viewMappingOtherDetails(content:any,mappingOutput:MappingOutput){
    console.log('data--->'+JSON.stringify(mappingOutput));
    if(mappingOutput.mappingId>0){
      this.selectedMapping=mappingOutput;
      this.dataProcessService.getMappingOtherDetails(mappingOutput).subscribe(
        (data:any)=>{
          console.log('res-->'+JSON.stringify(data));
         this.coreTable=data.responseMessage; 
        }
      );
      this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  mappingOtherDetails(mappingOutput:MappingOutput){
    console.log('mapping data-->'+JSON.stringify(mappingOutput));
  }
  processNow(data:MappingOutput){
    console.log('data-->'+JSON.stringify(data));
    this.dataProcessService.setMappingData(data);
    this.router.navigate(["/dataprocess/processnow"]);
  }
}
