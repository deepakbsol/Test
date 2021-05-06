import { TestBed } from '@angular/core/testing';

import { FileAdminGuard } from './file-admin.guard';

describe('FileAdminGuard', () => {
  let guard: FileAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FileAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
