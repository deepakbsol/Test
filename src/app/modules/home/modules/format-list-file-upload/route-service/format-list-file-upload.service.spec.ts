import { TestBed } from '@angular/core/testing';

import { FormatListFileUploadService } from './format-list-file-upload.service';

describe('FormatListFileUploadService', () => {
  let service: FormatListFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatListFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
