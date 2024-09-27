import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateMonitoringTabComponent } from './heart-rate-monitoring-tab.component';

describe('HeartRateMonitoringTabComponent', () => {
  let component: HeartRateMonitoringTabComponent;
  let fixture: ComponentFixture<HeartRateMonitoringTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeartRateMonitoringTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeartRateMonitoringTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
