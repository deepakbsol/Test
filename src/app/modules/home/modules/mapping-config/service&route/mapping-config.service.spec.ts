import { TestBed } from '@angular/core/testing';

import { MappingConfigService } from './mapping-config.service';

describe('MappingConfigService', () => {
  let service: MappingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
