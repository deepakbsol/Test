import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/service&route/app-service.service';
import { MappingConfigService } from '../../../mapping-config/service&route/mapping-config.service';

@Component({
  selector: 'app-create-reporting',
  templateUrl: './create-reporting.component.html',
  styleUrls: ['./create-reporting.component.scss']
})
export class CreateReportingComponent implements OnInit {

  isLinear = false;
  

  constructor() {}

  ngOnInit() {
    
  }

}
