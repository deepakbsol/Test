import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HomeService } from '../../home.service';
import { MappingOutput } from '../../modules/mapping-config/model/mappingOutput';

@Component({
  selector: 'app-homedata',
  templateUrl: './homedata.component.html',
  styleUrls: ['./homedata.component.scss']
})
export class HomedataComponent implements OnInit {

  constructor(private homeService:HomeService,    
    private modalService:NgbModal,private tosterService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  data:any;
  closeResult: string=''; 
  selectedMapId:Array<number>=new Array<number>();
  mappingList:Array<MappingOutput>=new Array<MappingOutput>();
  selectedMappingList:Array<MappingOutput>=new Array<MappingOutput>();
  mappingProcess(content:any){
    
    this.selectedMapId.length=0;
    this.homeService.getMappingList().subscribe((data:any)=>{
      console.log('ddd-->'+JSON.stringify(data));
      this.mappingList=data;

      this.modalService.open(content, {size: 'md',animation:true,backdrop:false,scrollable:false})
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    },err=>{
      this.tosterService.error('error while loading mapping list data');
    });
    console.log('mapping list-->'+JSON.stringify(this.mappingList));
    
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
  changedSelectedMapping(e:any){
    if(e.target.checked){
      //this.selectedMapId.push(e.target.value);
      //console.log(e.ta)
      console.log('ddd-->'+e.target.value);
      for(let x of this.mappingList){
        if(x.mappingId==e.target.value)
          this.selectedMappingList.push(x);
      }
    }else{
      this.selectedMappingList.forEach((value,index)=>{
        if(value.mappingId==e.target.value) this.selectedMappingList.splice(index,1);
      });
    }
    console.log('ssss-->'+JSON.stringify(this.selectedMappingList));
  }

  submit(){
    this.homeService.setSelectedMapping(this.selectedMappingList);
    this.router.navigate(["/dataprocess"]);
    this.modalService.dismissAll();
    // for(let x of this.selectedMapId){
    // this.mappingList.forEach((value,index)=>{
    //   if(value.mappingId!=x) this.mappingList.splice(index,1);
    // });
    // }
    // console.log('mmmm--->'+JSON.stringify(this.mappingList));
  }

}