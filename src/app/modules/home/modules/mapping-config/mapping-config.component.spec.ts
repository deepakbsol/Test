import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingConfigComponent } from './mapping-config.component';

describe('MappingConfigComponent', () => {
  let component: MappingConfigComponent;
  let fixture: ComponentFixture<MappingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MappingConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
