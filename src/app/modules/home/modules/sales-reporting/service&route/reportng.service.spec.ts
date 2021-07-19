import { TestBed } from '@angular/core/testing';

import { ReportngService } from './reportng.service';

describe('ReportngService', () => {
  let service: ReportngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
