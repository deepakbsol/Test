import { TestBed } from '@angular/core/testing';

import { CoreTableModuleHubGuard } from './core-table-module-hub.guard';

describe('CoreTableModuleHubGuard', () => {
  let guard: CoreTableModuleHubGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoreTableModuleHubGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
