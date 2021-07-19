import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportingComponent } from './sales-reporting.component';

describe('SalesReportingComponent', () => {
  let component: SalesReportingComponent;
  let fixture: ComponentFixture<SalesReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
