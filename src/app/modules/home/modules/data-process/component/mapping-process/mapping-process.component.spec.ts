import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingProcessComponent } from './mapping-process.component';

describe('MappingProcessComponent', () => {
  let component: MappingProcessComponent;
  let fixture: ComponentFixture<MappingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
