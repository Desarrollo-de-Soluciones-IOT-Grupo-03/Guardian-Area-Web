import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalFunctionsComponent } from './vital-functions.component';

describe('VitalFunctionsComponent', () => {
  let component: VitalFunctionsComponent;
  let fixture: ComponentFixture<VitalFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalFunctionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
