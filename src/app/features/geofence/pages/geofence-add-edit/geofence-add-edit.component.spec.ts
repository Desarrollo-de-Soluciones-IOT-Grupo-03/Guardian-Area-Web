import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceAddEditComponent } from './geofence-add-edit.component';

describe('GeofenceAddEditComponent', () => {
  let component: GeofenceAddEditComponent;
  let fixture: ComponentFixture<GeofenceAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeofenceAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeofenceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
