import { TestBed } from '@angular/core/testing';

import { FileAdminService } from './file-admin.service';

describe('FileAdminService', () => {
  let service: FileAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
