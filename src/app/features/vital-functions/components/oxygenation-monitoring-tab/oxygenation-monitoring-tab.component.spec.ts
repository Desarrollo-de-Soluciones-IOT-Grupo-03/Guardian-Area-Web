import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxygenationMonitoringTabComponent } from './oxygenation-monitoring-tab.component';

describe('OxygenationMonitoringTabComponent', () => {
  let component: OxygenationMonitoringTabComponent;
  let fixture: ComponentFixture<OxygenationMonitoringTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OxygenationMonitoringTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OxygenationMonitoringTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
