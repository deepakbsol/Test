import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportingComponent } from './view-reporting.component';

describe('ViewReportingComponent', () => {
  let component: ViewReportingComponent;
  let fixture: ComponentFixture<ViewReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
