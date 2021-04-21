import { TestBed } from '@angular/core/testing';

import { LoginErrorInterceptor } from './login-error.interceptor';

describe('LoginErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoginErrorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoginErrorInterceptor = TestBed.inject(LoginErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
